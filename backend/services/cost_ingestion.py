"""
Cost ingestion services for AWS, GCP, and Azure cost exports.
"""
import pandas as pd
import io
from datetime import datetime, date
from typing import Dict, Any
from fastapi import UploadFile, HTTPException
from sqlalchemy.orm import Session

from backend.models.cost import CloudCost
from backend.schemas.cost import UploadResponse


async def ingest_aws_cost_csv(file: UploadFile, db: Session) -> UploadResponse:
    """
    Ingest AWS Cost and Usage Report (CUR) CSV file.
    
    Args:
        file: Uploaded CSV file
        db: Database session
        
    Returns:
        UploadResponse with ingestion statistics
    """
    try:
        # Read file contents
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
        
        # AWS CUR column mapping (simplified - adjust based on actual CUR format)
        # Common CUR columns:
        # - lineItem/UsageStartDate
        # - lineItem/UnblendedCost
        # - lineItem/UsageAccountId
        # - product/region
        # - lineItem/ProductCode
        # - resourceTags/user:env
        # - resourceTags/user:team
        
        # Normalize column names (handle different CUR versions)
        column_mapping = {
            'lineItem/UsageStartDate': 'usage_date',
            'lineItem/UnblendedCost': 'cost',
            'lineItem/UsageAccountId': 'account_id',
            'product/region': 'region',
            'lineItem/ProductCode': 'service',
            'lineItem/UsageType': 'usage_type',
            'lineItem/CurrencyCode': 'currency',
            'resourceTags/user:env': 'env',
            'resourceTags/user:team': 'team',
        }
        
        # Try to find matching columns (case-insensitive)
        available_columns = df.columns.tolist()
        mapped_data = {}
        
        for aws_col, normalized_col in column_mapping.items():
            # Find column (exact match or case-insensitive)
            matching_col = None
            for col in available_columns:
                if col == aws_col or col.lower() == aws_col.lower():
                    matching_col = col
                    break
            
            if matching_col:
                mapped_data[normalized_col] = df[matching_col]
        
        # Create normalized DataFrame
        normalized_df = pd.DataFrame(mapped_data)
        
        # Ensure required columns exist
        required_cols = ['usage_date', 'cost', 'account_id', 'service']
        missing_cols = [col for col in required_cols if col not in normalized_df.columns]
        if missing_cols:
            raise HTTPException(
                status_code=400,
                detail=f"Missing required columns in AWS CUR: {missing_cols}"
            )
        
        # Convert date column
        normalized_df['usage_date'] = pd.to_datetime(normalized_df['usage_date']).dt.date
        
        # Fill missing optional columns
        if 'region' not in normalized_df.columns:
            normalized_df['region'] = 'unknown'
        if 'env' not in normalized_df.columns:
            normalized_df['env'] = None
        if 'team' not in normalized_df.columns:
            normalized_df['team'] = None
        if 'usage_type' not in normalized_df.columns:
            normalized_df['usage_type'] = None
        if 'currency' not in normalized_df.columns:
            normalized_df['currency'] = 'USD'
        
        # Filter out zero-cost rows
        normalized_df = normalized_df[normalized_df['cost'] > 0]
        
        # Add cloud provider
        normalized_df['cloud'] = 'aws'
        
        # Prepare records for bulk insert
        records = []
        for _, row in normalized_df.iterrows():
            record = CloudCost(
                ts_date=row['usage_date'],
                cloud='aws',
                account_id=str(row['account_id']),
                service=str(row['service']),
                region=str(row['region']),
                env=str(row['env']) if pd.notna(row['env']) else None,
                team=str(row['team']) if pd.notna(row['team']) else None,
                usage_type=str(row['usage_type']) if pd.notna(row['usage_type']) else None,
                cost_amount=float(row['cost']),
                currency=str(row['currency'])
            )
            records.append(record)
        
        # Bulk insert in batches
        batch_size = 1000
        for i in range(0, len(records), batch_size):
            batch = records[i:i + batch_size]
            db.bulk_save_objects(batch)
            db.commit()
        
        # Calculate statistics
        start_date = normalized_df['usage_date'].min()
        end_date = normalized_df['usage_date'].max()
        total_cost = float(normalized_df['cost'].sum())
        rows_ingested = len(records)
        
        return UploadResponse(
            rows_ingested=rows_ingested,
            start_date=start_date,
            end_date=end_date,
            total_cost=total_cost,
            cloud='aws'
        )
        
    except pd.errors.EmptyDataError:
        raise HTTPException(status_code=400, detail="Empty CSV file")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error processing AWS CUR: {str(e)}")


async def ingest_gcp_cost_file(file: UploadFile, db: Session) -> UploadResponse:
    """
    Ingest GCP billing export file (CSV or JSON).
    
    Args:
        file: Uploaded file
        db: Database session
        
    Returns:
        UploadResponse with ingestion statistics
    """
    try:
        # Read file contents
        contents = await file.read()
        
        # Try CSV first, then JSON
        try:
            df = pd.read_csv(io.BytesIO(contents))
        except:
            df = pd.read_json(io.BytesIO(contents))
        
        # GCP billing export column mapping
        # Common columns:
        # - usage_start_time
        # - cost
        # - project.id
        # - service.description
        # - location.region
        # - labels.env
        # - labels.team
        
        column_mapping = {
            'usage_start_time': 'usage_date',
            'cost': 'cost',
            'project.id': 'account_id',
            'service.description': 'service',
            'location.region': 'region',
            'sku.description': 'usage_type',
            'currency': 'currency',
            'labels.env': 'env',
            'labels.team': 'team',
        }
        
        # Map columns
        available_columns = df.columns.tolist()
        mapped_data = {}
        
        for gcp_col, normalized_col in column_mapping.items():
            matching_col = None
            for col in available_columns:
                if col == gcp_col or col.lower() == gcp_col.lower():
                    matching_col = col
                    break
            
            if matching_col:
                mapped_data[normalized_col] = df[matching_col]
        
        normalized_df = pd.DataFrame(mapped_data)
        
        # Ensure required columns
        required_cols = ['usage_date', 'cost', 'account_id', 'service']
        missing_cols = [col for col in required_cols if col not in normalized_df.columns]
        if missing_cols:
            raise HTTPException(
                status_code=400,
                detail=f"Missing required columns in GCP export: {missing_cols}"
            )
        
        # Convert date
        normalized_df['usage_date'] = pd.to_datetime(normalized_df['usage_date']).dt.date
        
        # Fill missing columns
        if 'region' not in normalized_df.columns:
            normalized_df['region'] = 'global'
        if 'env' not in normalized_df.columns:
            normalized_df['env'] = None
        if 'team' not in normalized_df.columns:
            normalized_df['team'] = None
        if 'usage_type' not in normalized_df.columns:
            normalized_df['usage_type'] = None
        if 'currency' not in normalized_df.columns:
            normalized_df['currency'] = 'USD'
        
        # Filter zero-cost rows
        normalized_df = normalized_df[normalized_df['cost'] > 0]
        
        # Prepare records
        records = []
        for _, row in normalized_df.iterrows():
            record = CloudCost(
                ts_date=row['usage_date'],
                cloud='gcp',
                account_id=str(row['account_id']),
                service=str(row['service']),
                region=str(row['region']),
                env=str(row['env']) if pd.notna(row['env']) else None,
                team=str(row['team']) if pd.notna(row['team']) else None,
                usage_type=str(row['usage_type']) if pd.notna(row['usage_type']) else None,
                cost_amount=float(row['cost']),
                currency=str(row['currency'])
            )
            records.append(record)
        
        # Bulk insert
        batch_size = 1000
        for i in range(0, len(records), batch_size):
            batch = records[i:i + batch_size]
            db.bulk_save_objects(batch)
            db.commit()
        
        # Statistics
        start_date = normalized_df['usage_date'].min()
        end_date = normalized_df['usage_date'].max()
        total_cost = float(normalized_df['cost'].sum())
        rows_ingested = len(records)
        
        return UploadResponse(
            rows_ingested=rows_ingested,
            start_date=start_date,
            end_date=end_date,
            total_cost=total_cost,
            cloud='gcp'
        )
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error processing GCP export: {str(e)}")


async def ingest_azure_cost_csv(file: UploadFile, db: Session) -> UploadResponse:
    """
    Ingest Azure cost export CSV file.
    
    Args:
        file: Uploaded CSV file
        db: Database session
        
    Returns:
        UploadResponse with ingestion statistics
    """
    try:
        # Read file contents
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
        
        # Azure cost export column mapping
        # Common columns:
        # - Date
        # - Cost
        # - SubscriptionId
        # - ServiceName
        # - ResourceLocation
        # - MeterCategory
        # - Tags (JSON string with env, team)
        
        column_mapping = {
            'Date': 'usage_date',
            'UsageDate': 'usage_date',
            'Cost': 'cost',
            'CostInBillingCurrency': 'cost',
            'SubscriptionId': 'account_id',
            'SubscriptionGuid': 'account_id',
            'ServiceName': 'service',
            'ConsumedService': 'service',
            'ResourceLocation': 'region',
            'Location': 'region',
            'MeterCategory': 'usage_type',
            'BillingCurrency': 'currency',
        }
        
        # Map columns
        available_columns = df.columns.tolist()
        mapped_data = {}
        
        for azure_col, normalized_col in column_mapping.items():
            matching_col = None
            for col in available_columns:
                if col == azure_col or col.lower() == azure_col.lower():
                    matching_col = col
                    break
            
            if matching_col:
                mapped_data[normalized_col] = df[matching_col]
        
        normalized_df = pd.DataFrame(mapped_data)
        
        # Ensure required columns
        required_cols = ['usage_date', 'cost', 'account_id', 'service']
        missing_cols = [col for col in required_cols if col not in normalized_df.columns]
        if missing_cols:
            raise HTTPException(
                status_code=400,
                detail=f"Missing required columns in Azure export: {missing_cols}"
            )
        
        # Convert date
        normalized_df['usage_date'] = pd.to_datetime(normalized_df['usage_date']).dt.date
        
        # Fill missing columns
        if 'region' not in normalized_df.columns:
            normalized_df['region'] = 'unknown'
        if 'usage_type' not in normalized_df.columns:
            normalized_df['usage_type'] = None
        if 'currency' not in normalized_df.columns:
            normalized_df['currency'] = 'USD'
        
        # Parse tags if available (Azure stores tags as JSON string)
        normalized_df['env'] = None
        normalized_df['team'] = None
        
        if 'Tags' in df.columns:
            import json
            for idx, tags_str in df['Tags'].items():
                if pd.notna(tags_str) and tags_str:
                    try:
                        tags = json.loads(tags_str)
                        if 'env' in tags:
                            normalized_df.at[idx, 'env'] = tags['env']
                        if 'team' in tags:
                            normalized_df.at[idx, 'team'] = tags['team']
                    except:
                        pass
        
        # Filter zero-cost rows
        normalized_df = normalized_df[normalized_df['cost'] > 0]
        
        # Prepare records
        records = []
        for _, row in normalized_df.iterrows():
            record = CloudCost(
                ts_date=row['usage_date'],
                cloud='azure',
                account_id=str(row['account_id']),
                service=str(row['service']),
                region=str(row['region']),
                env=str(row['env']) if pd.notna(row['env']) else None,
                team=str(row['team']) if pd.notna(row['team']) else None,
                usage_type=str(row['usage_type']) if pd.notna(row['usage_type']) else None,
                cost_amount=float(row['cost']),
                currency=str(row['currency'])
            )
            records.append(record)
        
        # Bulk insert
        batch_size = 1000
        for i in range(0, len(records), batch_size):
            batch = records[i:i + batch_size]
            db.bulk_save_objects(batch)
            db.commit()
        
        # Statistics
        start_date = normalized_df['usage_date'].min()
        end_date = normalized_df['usage_date'].max()
        total_cost = float(normalized_df['cost'].sum())
        rows_ingested = len(records)
        
        return UploadResponse(
            rows_ingested=rows_ingested,
            start_date=start_date,
            end_date=end_date,
            total_cost=total_cost,
            cloud='azure'
        )
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Error processing Azure export: {str(e)}")
