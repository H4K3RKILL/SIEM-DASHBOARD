
import type { PlanPhase, Alert, LogEntry, CodeExample, RunbookSection, DeliverableItem, ViewType } from './types';

export const PLAN_PHASES: PlanPhase[] = [
  {
    id: 'phase-0',
    title: 'Phase 0: Setup & Tooling',
    iconName: 'SetupIcon',
    description: 'Foundation for the SIEM pipeline: choosing the SIEM, setting up basic infrastructure using IaC, and creating a mock microservice for log generation.',
    keyActions: [
      'SIEM Choice & Basic Setup (IaC - Simplified). Primary: Azure Sentinel. Fallback: ELK.',
      'Mock Microservice: Simple Python (Flask) or Node.js (Express) app with logging.',
      'Containerize (Optional): Dockerfile for the mock app.',
    ],
    status: 'Conceptual',
    deliverables: ["Terraform (main.tf) / docker-compose.yml", "Mock App (app.py/app.js)", "Dockerfile"],
    details: "Focus on Azure Sentinel using Terraform for Log Analytics Workspace and Sentinel solution. If ELK, Docker Compose for local setup. Mock microservice logs to stdout."
  },
  {
    id: 'phase-1',
    title: 'Phase 1: Log Collection & Ingestion',
    iconName: 'IngestionIcon',
    description: 'Collecting logs from the mock microservice and relevant cloud platform services, and ingesting them into the chosen SIEM.',
    keyActions: [
      'Ingest Mock Microservice Logs (application, access, container stdout): Azure Monitor Agent (AMA) for Sentinel or Fluent Bit for ELK.',
      'Ingest Cloud Platform Logs: Azure Activity Logs, AWS CloudTrail (conceptual).',
      'Ingest Kubernetes Control-Plane Events: API server, kubelet logs (conceptual).',
    ],
    status: 'Conceptual',
    deliverables: ["AMA config (conceptual) / fluent-bit.conf", "Screenshots of ingested logs (simulated)"],
    details: "Ensure comprehensive log collection. For Azure Sentinel with containers, AMA collects stdout. For ELK, Fluent Bit tails logs. Cloud platform logs (e.g., Azure Activity, AWS CloudTrail) and Kubernetes events (API server, kubelet) are crucial for context."
  },
  {
    id: 'phase-2',
    title: 'Phase 2: Detection Rules & Dashboards',
    iconName: 'DetectionIcon',
    description: 'Authoring 3-5 core analytics rules to detect suspicious activities and creating dashboards for visualization, as per PDF requirements.',
    keyActions: [
      'Author 3-5 Analytics Rules (KQL/DSL): Spike in HTTP 4xx/5xx Errors; Unexpected Privilege Escalations; Large Data Pulls from Storage.',
      'Build a Dashboard: Visualizations for "Privilege Elevations vs. Login Successes", "Data Transfer by Service", "Error-Rate Trends".',
      'Tune thresholds to minimize false positives but catch real incidents.',
    ],
    status: 'Conceptual',
    deliverables: ["KQL/DSL queries", "Dashboard export JSON/NDJSON (conceptual)"],
    details: "Rules target specific scenarios like unexpected privilege escalations, spikes in 4xx/5xx errors, and large data pulls. Dashboard provides at-a-glance view of key security metrics. Tuning is an ongoing process."
  },
  {
    id: 'phase-3',
    title: 'Phase 3: Automated Response Playbooks',
    iconName: 'ResponseIcon',
    description: 'Creating automated actions to respond to specific alerts, including Slack notifications, simulated IP blocking, and service account disabling.',
    keyActions: [
      'For each detection rule, create response (Logic App / Python script).',
      'Action: Post detailed alerts to Slack (log snippets, links).',
      'Action: Automatically tag or block suspicious IPs at WAF/NSG.',
      'Action: Disable or rotate compromised service accounts if critical alert fires.',
      'Document Runbook for "Detected Data Exfiltration" & "Compromised API Key".'
    ],
    status: 'Conceptual',
    deliverables: ["Logic App JSON (conceptual) / Python script", "RUNBOOK.md section"],
    details: "Focus on automated responses like Slack notifications, (simulated) WAF/NSG IP blocking, and disabling/rotating service accounts for critical alerts. Runbook details manual steps for specific incidents."
  },
  {
    id: 'phase-4',
    title: 'Phase 4: CI/CD Integration',
    iconName: 'CiCdIcon',
    description: 'Integrating SIEM checks into the deployment pipeline and ensuring new services can be onboarded via templates.',
    keyActions: [
      'Integrate SIEM check: Pipeline verifies "no new critical alerts" in the last hour after release.',
      'New microservices onboarding: Use a template for automatic log path registration and baseline rules.',
      'Ensure rule-triggered issues block promotion to production until acknowledged.',
    ],
    status: 'Conceptual',
    deliverables: ["CI/CD YAML file (e.g., .github/workflows/ci.yml)"],
    details: "Demonstrate DevSecOps: Check for new critical alerts post-deployment. New microservices are onboarded with templates. Rule-triggered issues halt production promotion."
  },
  {
    id: 'phase-5',
    title: 'Phase 5: Documentation & Deliverables (Overall)',
    iconName: 'DocsIcon',
    description: 'Comprehensive documentation including a README and the full RUNBOOK, ensuring all project deliverables are met.',
    keyActions: [
      'README.md: Project overview, tech choices, setup, deliverables explanation.',
      'RUNBOOK.md (Full): Onboarding, incident response, rule tuning guidelines.',
      'Verify all deliverables from PDF are addressed.',
    ],
    status: 'Conceptual',
    deliverables: ["README.md", "RUNBOOK.md (full version)", "All PDF deliverables (simulated/showcased)"],
    details: "Final documentation consolidating all aspects. Cross-reference with the 'Deliverables Checklist' to ensure completeness."
  },
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'alert-001',
    title: 'Spike in HTTP 5xx Errors',
    severity: 'High',
    description: 'A significant increase in server-side errors (HTTP 500-599) has been detected from the "payments-service" application.',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    source: 'Mock Microservice Logs',
    ruleId: 'RULE-HTTP5XX',
    details: {
      'Affected Service': 'payments-service',
      'Error Count': '27 events in 5 minutes',
      'Affected IP': '192.168.1.102',
    }
  },
  {
    id: 'alert-002',
    title: 'Anomalous RDP Login Activity',
    severity: 'Medium',
    description: 'Unusual Remote Desktop Protocol login attempt detected for user "admin" from an external IP address.',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    source: 'Azure Active Directory (Simulated)',
    ruleId: 'RULE-RDP-ANOMALY',
    details: {
      'Username': 'admin',
      'Source IP': '203.0.113.45',
      'Login Status': 'Failed',
      'Reason': 'Unknown user or bad password'
    }
  },
  {
    id: 'alert-003',
    title: 'Sensitive Azure Operation: VM Created',
    severity: 'Medium',
    description: 'A new virtual machine was created outside of expected maintenance windows or by an unauthorized user.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    source: 'Azure Activity Logs',
    ruleId: 'RULE-AZURE-VM-CREATE',
    details: {
      'Operation': 'Microsoft.Compute/virtualMachines/write',
      'Caller': 'user@example.com',
      'Resource Group': 'prod-rg',
      'VM Name': 'suspicious-vm-01'
    }
  },
  {
    id: 'alert-004',
    title: 'Potential Data Exfiltration Attempt',
    severity: 'Critical',
    description: 'Large volume of data uploaded from an internal database server to an unknown external IP address.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
    source: 'Network Monitoring (Simulated)',
    ruleId: 'RULE-DATA-EXFIL',
     details: {
      'Source Server': 'db-server-01 (10.0.1.5)',
      'Destination IP': '198.51.100.12',
      'Data Volume': '5.2 GB',
      'Protocol': 'FTP'
    }
  },
    {
    id: 'alert-005',
    title: 'Compromised API Key Usage',
    severity: 'High',
    description: 'An API key associated with "billing-service" was used from a new geographical region.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    source: 'CloudTrail / API Gateway Logs (Simulated)',
    ruleId: 'RULE-API-KEY-COMPROMISE',
     details: {
      'API Key ID': 'AKIAIOSFODNN7EXAMPLE',
      'Service': 'billing-service',
      'Original Region': 'us-east-1',
      'Anomalous Region': 'ap-southeast-2',
      'Source IP': '172.15.99.83'
    }
  },
  {
    id: 'alert-006',
    title: 'Unexpected Privilege Escalation',
    severity: 'High',
    description: 'User "app_user_serviceX" attempted to perform an administrative action typically reserved for "root" or "admin" users on host "worker-node-05".',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    source: 'Linux AuditD / Syslog (Simulated)',
    ruleId: 'RULE-PRIV-ESC',
    details: {
      'User': 'app_user_serviceX',
      'Attempted Action': 'sudo /usr/sbin/useradd new_admin',
      'Hostname': 'worker-node-05',
      'Result': 'Denied / Failed'
    }
  },
  {
    id: 'alert-007',
    title: 'Large Data Pull from Storage (Blob)',
    severity: 'Medium',
    description: 'An unusually large amount of data (15GB) was downloaded from the "customer-sensitive-data" blob container by user "analyst_temp@example.com".',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    source: 'Azure Storage Logs (Simulated)',
    ruleId: 'RULE-LARGE-PULL-BLOB',
    details: {
      'User': 'analyst_temp@example.com',
      'Storage Account': 'prodsensitivedata',
      'Container': 'customer-sensitive-data',
      'Data Transferred': '15 GB',
      'Source IP': '203.0.113.78'
    }
  }
];

export const MOCK_LOGS: LogEntry[] = [
  { id: 'log-1', timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), level: 'INFO', message: 'User admin logged in successfully from 192.168.1.50', source: 'auth-service' },
  { id: 'log-2', timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(), level: 'WARN', message: 'Failed login attempt for user guest from 10.0.0.33', source: 'auth-service' },
  { id: 'log-3', timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(), level: 'INFO', message: 'GET /api/data request successful from 192.168.1.102', source: 'payments-service' },
  { id: 'log-4', timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(), level: 'ERROR', message: 'HTTP 500: Internal server error on POST /api/process', source: 'payments-service' },
  { id: 'log-5', timestamp: new Date(Date.now() - 1 * 60 * 1000).toISOString(), level: 'ERROR', message: 'Database connection timeout', source: 'payments-service' },
  { id: 'log-6', timestamp: new Date(Date.now() - 55 * 1000).toISOString(), level: 'INFO', message: 'New VM "test-vm-01" created by user@example.com', source: 'AzureActivity'},
  { id: 'log-7', timestamp: new Date(Date.now() - 45 * 1000).toISOString(), level: 'DEBUG', message: 'Processing payment ID: 12345ABC', source: 'payments-service'},
  { id: 'log-8', timestamp: new Date(Date.now() - 30 * 1000).toISOString(), level: 'INFO', message: 'Service health check OK', source: 'api-gateway'},
  { id: 'log-9', timestamp: new Date(Date.now() - 15 * 1000).toISOString(), level: 'WARN', message: 'High CPU utilization on worker-node-3', source: 'kubernetes-cluster'},
];

export const GEMINI_API_KEY_INFO = 
  `For AI-powered insights, ensure the Gemini API key is configured in your environment variables as API_KEY. 
  If the key is not set or is invalid, analysis will be unavailable. This application uses the Gemini API to provide explanations and suggestions for selected security alerts.
  The model used is 'gemini-2.5-flash-preview-04-17'.`;

export const MOCK_GEMINI_UNAVAILABLE_MSG = "AI analysis is unavailable. Please ensure your API_KEY environment variable is correctly configured and valid.";


// Content based on the user's detailed "Consolidated Plan"
export const IAC_EXAMPLES: CodeExample[] = [
  {
    id: 'tf-sentinel',
    title: 'Terraform for Azure Sentinel (main.tf excerpt)',
    language: 'terraform',
    description: 'Simplified Terraform to deploy Azure Log Analytics Workspace and enable Sentinel. This represents the Infrastructure as Code (IaC) deliverable for a cloud-native SIEM.',
    code: `
resource "azurerm_resource_group" "siem_rg" {
  name     = "siem-rg"
  location = "East US"
}

resource "azurerm_log_analytics_workspace" "siem_la" {
  name                = "siem-loganalytics-workspace"
  location            = azurerm_resource_group.siem_rg.location
  resource_group_name = azurerm_resource_group.siem_rg.name
  sku                 = "PerGB2018" # Or "Free" for testing
  retention_in_days   = 30
}

resource "azurerm_log_analytics_solution" "sentinel" {
  solution_name         = "SecurityInsights"
  location              = azurerm_log_analytics_workspace.siem_la.location
  resource_group_name   = azurerm_log_analytics_workspace.siem_la.resource_group_name
  workspace_resource_id = azurerm_log_analytics_workspace.siem_la.id
  workspace_name        = azurerm_log_analytics_workspace.siem_la.name

  plan {
    publisher = "Microsoft"
    product   = "OMSGallery/SecurityInsights"
  }
}
    `.trim(),
  },
  {
    id: 'docker-compose-elk',
    title: 'Docker Compose for ELK Stack (docker-compose.yml)',
    language: 'yaml',
    description: 'Basic Docker Compose for a local ELK stack (Elasticsearch, Kibana, Fluent Bit). This is an IaC alternative if not using a cloud-managed SIEM.',
    code: `
version: '3.8'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.17.0 # Choose a version
    container_name: es01
    environment:
      - node.name=es01
      - cluster.name=es-docker-cluster
      - discovery.type=single-node
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - esdata01:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
    networks:
      - elastic

  kibana:
    image: docker.elastic.co/kibana/kibana:7.17.0 # Match Elasticsearch version
    container_name: kib01
    ports:
      - 5601:5601
    environment:
      ELASTICSEARCH_URL: http://es01:9200
      ELASTICSEARCH_HOSTS: '["http://es01:9200"]'
    depends_on:
      - elasticsearch
    networks:
      - elastic

  fluent-bit:
    image: fluent/fluent-bit:latest
    container_name: fluentbit01
    volumes:
      - ./fluent-bit.conf:/fluent-bit/etc/fluent-bit.conf
      # Example: Mount application logs if not using Docker log driver
      # - /var/log/my-app:/var/log/my-app 
    ports:
      - "24224:24224" # For Fluentd forward protocol
      - "24224:24224/udp"
    depends_on:
      - elasticsearch
    networks:
      - elastic

volumes:
  esdata01:
    driver: local

networks:
  elastic:
    driver: bridge
    `.trim(),
  },
  {
    id: 'fluent-bit-conf',
    title: 'Fluent Bit Configuration (fluent-bit.conf excerpt)',
    language: 'ini',
    description: 'Example Fluent Bit configuration to tail Docker logs (or application files) and forward to Elasticsearch.',
    code: `
[SERVICE]
    Flush        1
    Daemon       Off
    Log_Level    info
    HTTP_Server  On
    HTTP_Listen  0.0.0.0
    HTTP_Port    2020

[INPUT]
    Name         tail
    Path         /var/log/my-app/*.log # Example: Path to application logs if mounted
    # For Docker container logs (if fluent-bit runs on host or has access to Docker socket)
    # Name docker
    # Docker_Mode unix:///var/run/docker.sock
    Tag          app.logs

[OUTPUT]
    Name         es
    Match        *
    Host         es01 # Docker service name for Elasticsearch
    Port         9200
    Index        my-app-logs-%Y.%m.%d # Daily indices
    Type         _doc
    HTTP_User    # elastic_user (if security enabled)
    HTTP_Passwd  # elastic_password (if security enabled)
    Retry_Limit  False 
    `.trim(),
  }
];

export const CICD_EXAMPLES: CodeExample[] = [
  {
    id: 'github-actions-ci',
    title: 'GitHub Actions CI/CD Snippet (ci.yml excerpt)',
    language: 'yaml',
    description: `
Simulated SIEM check step in a GitHub Actions workflow. Key aspects:
- **Post-Release Verification:** After a hypothetical deployment, a step queries the SIEM for new critical alerts related to the deployment within a defined window (e.g., last hour).
- **Block Promotion:** If critical alerts are found (simulated by 'exit 1'), the pipeline would fail, blocking promotion to production until issues are acknowledged and remediated.
- **Template-Based Onboarding (Conceptual):** In a full CI/CD setup for new microservices, this pipeline would include steps to apply a service template. This template automatically registers new log paths with the log collector (e.g., updating Fluent Bit configmaps or AMA DCRs) and deploys baseline detection rules for the new service.
    `.trim(),
    code: `
name: Deploy and Check SIEM

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      # ... other build and deploy steps ...

      - name: Hypothetical Deploy Step
        run: echo "Deploying application..."

      - name: Check SIEM for New Critical Alerts (Simulated)
        id: siem_check
        run: |
          echo "SIMULATING: Querying SIEM for critical alerts related to this deployment in the last hour..."
          # In a real scenario, this script would use:
          # For Azure Sentinel: 'az monitor log-analytics query --workspace <workspace-id> --analytics-query "SecurityAlert | where TimeGenerated > ago(1h) and AlertSeverity == 'High' or AlertSeverity == 'Critical' and toupper(AlertName) contains 'YOUR_APP_NAME'"'
          # For ELK: An Elasticsearch API call via curl or a client library.
          
          # Simulate finding an alert to demonstrate pipeline blocking
          # To simulate success (no alerts), comment out the next line and ensure exit 0
          # echo "CRITICAL_ALERT_FOUND=true" >> $GITHUB_ENV; exit 1;

          echo "SIMULATION: No new critical alerts found."
          exit 0 
      
      - name: Evaluate SIEM Check
        if: failure() && steps.siem_check.conclusion == 'failure'
        run: |
          echo "SIEM Check Failed! Critical alerts detected post-deployment. Promotion to production blocked."
          # Further actions: notify team, create incident ticket
          exit 1 # Ensure job fails
    `.trim(),
  }
];


export const DETECTION_RULES_EXAMPLES: CodeExample[] = [
  {
    id: 'kql-5xx',
    title: 'KQL Rule: Spike in HTTP 5xx Errors',
    language: 'kql',
    description: 'Azure Sentinel KQL query to detect a spike in HTTP 5xx errors from a specific microservice or overall.',
    code: `
// For a specific service (e.g., from ContainerLogV2 or custom app logs)
ContainerLogV2 // Or your custom log table like 'AppRequests_CL'
| where ServiceName_s == "payments-service" // Adjust field for service name
| where HttpStatusCode_d >= 500 and HttpStatusCode_d <= 599 // Or similar field for HTTP status
| summarize ErrorCount = count() by bin(TimeGenerated, 5m), ServiceName_s, OperationName // Adjust grouping as needed
| where ErrorCount > 10 // Threshold for spike
| project TimeGenerated, ServiceName_s, OperationName, ErrorCount
    `.trim()
  },
  {
    id: 'kql-sensitive-op',
    title: 'KQL Rule: Sensitive Azure Operation (Privilege Escalation Vector)',
    language: 'kql',
    description: 'Azure Sentinel KQL query to alert on specific sensitive operations that could be part of privilege escalation, e.g., adding a user to a privileged group.',
    code: `
AuditLogs // For Azure AD Audit Logs
| where OperationName has "Add member to group" // Or other sensitive operations like "Update user", "Reset user password"
| where TargetResources has_any ("PrivilegedAdminGroupObjectID", "GlobalAdminsGroupObjectID") // Object IDs of highly privileged groups
| extend InitiatingUser = tostring(InitiatedBy.user.userPrincipalName)
| extend TargetUser = tostring(TargetResources[0].userPrincipalName) // User being added
| extend TargetGroup = tostring(TargetResources[0].displayName) // Group user is added to
| where isnotempty(InitiatingUser) and isnotempty(TargetUser)
| project TimeGenerated, OperationName, InitiatingUser, TargetUser, TargetGroup, Result
// Further tune by whitelisting expected admin activities or specific admin users.
    `.trim()
  },
  {
    id: 'kql-large-data-pull',
    title: 'KQL Rule: Large Data Pull from Azure Storage',
    language: 'kql',
    description: 'Azure Sentinel KQL query to detect unusually large data egress from Azure Blob Storage, potentially indicating data exfiltration.',
    code: `
StorageBlobLogs
| where OperationName == "GetBlob"
| extend DataTransferSizeMB =ResponseBodySize / (1024.0 * 1024.0)
| where DataTransferSizeMB > 1000 // Threshold: e.g., > 1GB downloaded by a single user/IP in a short timeframe
| summarize TotalDataMB = sum(DataTransferSizeMB), count() by CallerIpAddress, RequesterObjectId, UserPrincipalName, bin(TimeGenerated, 1h) // Aggregate over 1 hour
| where TotalDataMB > 5000 // Higher threshold for aggregated data over time
| project TimeGenerated, CallerIpAddress, UserPrincipalName, TotalDataMB
// Consider filtering by storage account, container, or known sensitive data tags.
    `.trim()
  },
  {
    id: 'elk-dsl-5xx',
    title: 'Elasticsearch DSL: Spike in HTTP 5xx Errors',
    language: 'json',
    description: 'Conceptual Elasticsearch DSL query for an ELK Watcher or ElastAlert rule to detect a spike in HTTP 5xx errors.',
    code: `
{
  "query": {
    "bool": {
      "must": [
        { "range": { "@timestamp": { "gte": "now-5m/m" } } }, // Check last 5 minutes
        { "term": { "service_name.keyword": "payments-service" } },
        { "range": { "http.status_code": { "gte": 500, "lte": 599 } } }
      ]
    }
  },
  "aggs": {
    "error_count": {
      "value_count": { "field": "http.status_code" }
    }
  }
}
// This query would be part of a watcher.
// The watcher condition would check if 'ctx.payload.aggregations.error_count.value' > threshold (e.g., 10).
    `.trim()
  }
];

export const PLAYBOOK_EXAMPLES: CodeExample[] = [
  {
    id: 'logic-app-concept',
    title: 'Azure Logic App (Conceptual JSON structure)',
    language: 'json',
    description: 'Conceptual structure of a Logic App for Sentinel alert response (notify Slack, simulate block IP, and conceptual service account action).',
    code: `
{
  "definition": {
    "$schema": "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
    "actions": {
      "Post_message_to_Slack": { /* ... as before ... */ },
      "Simulate_Block_IP_at_WAF_NSG": { /* ... as before ... */ },
      "Check_Alert_Severity_and_Type_for_Account_Action": {
        "type": "If",
        "expression": {
          "and": [
            { "equals": ["@{triggerBody()?['Severity']}", "Critical"] },
            { "contains": ["@{triggerBody()?['DisplayName']}", "Compromised Service Account"] } // Example
          ]
        },
        "actions": {
          "Simulate_Disable_Service_Account": {
            "type": "Http",
            "inputs": {
              "method": "POST",
              "uri": "https://graph.microsoft.com/v1.0/users/{service_account_id}", // Conceptual for Azure AD
              // "uri": "https://your-iam-api.example.com/disable-account",
              "headers": { "Authorization": "Bearer YOUR_MANAGED_IDENTITY_TOKEN_OR_SECRET" },
              "body": { "accountEnabled": false } // Example for Azure AD
            },
            "runAfter": {}
          },
          "Notify_Admins_of_Account_Action": { /* ... similar to Slack post ... */ }
        },
        "runAfter": { "Simulate_Block_IP_at_WAF_NSG": ["Succeeded"] }
      }
    },
    "triggers": { /* ... as before ... */ }
  }
}
    `.trim()
  },
  {
    id: 'python-elk-handler',
    title: 'Python Script for ELK Alert Handling (alert_handler.py)',
    language: 'python',
    description: 'Simulated Python script for ELK (ElastAlert/Watcher) to post to Slack, simulate IP blocking, and conceptual service account disabling.',
    code: `
import requests
import json
import os

SLACK_WEBHOOK_URL = os.environ.get("SLACK_WEBHOOK_URL", "YOUR_SLACK_WEBHOOK_URL_HERE")

def post_to_slack(alert_details):
    # ... (Slack posting logic as before) ...
    pass

def simulate_block_ip(ip_address):
    # ... (IP blocking simulation as before) ...
    pass

def simulate_disable_service_account(account_id, alert_severity):
    if alert_severity in ["Critical", "High"] and account_id:
        print(f"SIMULATING: Disabling/rotating service account ID: {account_id} due to critical alert.")
        # In a real scenario:
        # - Call cloud provider API (e.g., AWS IAM, Azure AD Graph API) to disable the account or start rotation.
        # - Example: requests.patch(f"https://graph.microsoft.com/v1.0/servicePrincipals/{account_id}", json={"accountEnabled": False}, headers=auth_headers)
        # - Log this action securely.
    else:
        print("SIMULATING: Service account action not taken (severity not critical or no account ID).")


if __name__ == "__main__":
    # This is a mock alert. In a real ElastAlert/Watcher setup, this would be passed by the alerting system.
    mock_alert_compromised_key = {
        "rule_name": "Compromised API Key Usage",
        "name": "Critical API Key Compromise",
        "severity": "Critical",
        "description": "API Key AKIA... used from anomalous region.",
        "timestamp": "2024-07-28T12:00:00Z",
        "ip_address": "185.199.108.153",
        "service_account_id": "svc_billing_processor_prod_key_id_xyz" # Example ID
    }
    
    print("--- Processing Alert ---")
    post_to_slack(mock_alert_compromised_key)
    simulate_block_ip(mock_alert_compromised_key.get('ip_address'))
    simulate_disable_service_account(
        mock_alert_compromised_key.get('service_account_id'),
        mock_alert_compromised_key.get('severity')
    )
    print("--- Alert Processing Finished ---")
    `.trim()
  }
];


export const RUNBOOK_CONTENT: RunbookSection[] = [
  {
    id: 'onboarding',
    title: 'How to Onboard a New Microservice\'s Logs',
    content: `
### Objective
Ensure logs from new microservices are consistently collected and ingested into the SIEM (Azure Sentinel or ELK).

### For Azure Sentinel with AMA (Azure Monitor Agent)
1.  **Ensure Microservice Logs to Stdout/File:**
    *   Configure the microservice to output logs (JSON format preferred) to STDOUT/STDERR if containerized. This covers **application, access, and container stdout logs**.
    *   If running on a VM, ensure logs are written to a consistent file path (e.g., \`/var/log/my-app/app.log\`).
2.  **Create/Update Data Collection Rule (DCR) for AMA:**
    *   In Azure Portal, navigate to Monitor -> Data Collection Rules.
    *   **For Containers (AKS/ACI):** Ensure AMA is configured. For **Kubernetes control-plane events (API server, kubelet)**, enable relevant diagnostic settings for AKS to forward to Log Analytics.
    *   **For VMs:** Create or modify a DCR for custom text logs, Windows Event Logs, or Linux Syslog.
    *   **Cloud Platform Logs:** Enable connectors for **Azure Activity Logs**. For AWS, ingest **CloudTrail** logs via an S3 bucket and data connector or Lambda.
3.  **Verify Log Ingestion & Develop Baseline Rules.**

### For ELK Stack with Fluent Bit
1.  **Ensure Microservice Logs to Stdout/File.** (Covers **application, access, container stdout logs**)
2.  **Update Fluent Bit Configuration (\`fluent-bit.conf\`):**
    *   Add inputs for new service logs. For **Kubernetes control-plane events**, configure Fluent Bit (often as a DaemonSet) to collect logs from control plane nodes or use a K8s log forwarder.
    *   For **Cloud Platform Logs** (e.g., AWS CloudTrail from S3), use Fluent Bit's S3 input plugin or a similar mechanism.
3.  **Update Elasticsearch Index Template & Verify.**
4.  **Develop Baseline Detection Rules.**

### General Considerations
*   **Structured Logging:** JSON preferred.
*   **Log Retention & Documentation.**
    `.trim(),
  },
  {
    id: 'ir-data-exfil',
    title: 'IR Scenario: Detected Data Exfiltration',
    content: `
### Alert Trigger
*   **Rule Name:** "Potential Data Exfiltration Attempt" / "Large Data Pull from Storage"
*   **Description:** High volume of data egress from an internal sensitive system (e.g., database server, file share, cloud storage) to an untrusted external IP address, or unusual protocols/ports used for large transfers.
*   **Severity:** Critical

### Automated Actions (from Playbook)
1.  **Notification:** Immediate alert to #security-alerts Slack channel.
2.  **IP Blocking:** Attempt to add the suspicious external Destination IP to a WAF/NSG blocklist.
3.  **Account Action (Conditional):** If tied to a specific compromised user/service account, attempt to disable the account or force MFA re-authentication.

### Manual Analyst Steps
1.  **Validation (Triage - P1 - Immediate):** Confirm alert, identify source/destination, check IP reputation, review logs (network flow, firewall, proxy, source system).
2.  **Containment:** Block IP, isolate host, disable/reset compromised accounts, preserve evidence.
3.  **Eradication:** Identify malware/compromise vector, remove malicious code, patch vulnerabilities.
4.  **Recovery:** Restore systems, monitor closely, rotate credentials.
5.  **Lessons Learned:** Post-incident review, update rules/controls, update runbook.
    `.trim(),
  },
  {
    id: 'ir-api-key',
    title: 'IR Scenario: Compromised API Key',
    content: `
### Alert Trigger
*   **Rule Name:** "Compromised API Key Usage"
*   **Description:** API key used from unusual location/IP, or performs anomalous actions.
*   **Severity:** High to Critical

### Automated Actions (from Playbook)
1.  **Notification:** Alert to #security-alerts Slack channel.
2.  **Key Rotation/Revocation:** Attempt to revoke or trigger rotation for the suspected compromised API key. (Critical Action: May initially be manual for safety).
3.  **Service Account Disabling:** If the API key is tied to a service account and severity is critical, the playbook might attempt to **disable the associated service account.**

### Manual Analyst Steps
1.  **Validation (Triage - P1 - Immediate):** Confirm alert, identify API key & service, assess anomalous activity (source IP/geo, actions, time).
2.  **Containment:** **Revoke or Disable API Key (Highest Priority!)**. Identify scope of exposure. Block source IP.
3.  **Eradication:** Identify how key was exposed (hardcoded, leak, phishing). Scan for other instances.
4.  **Recovery:** Issue new key (least privilege), update apps securely, audit actions of compromised key, monitor new key.
5.  **Lessons Learned:** Review API key management, secrets scanning, developer education, improve detection.
    `.trim(),
  },
  {
    id: 'tuning-rules',
    title: 'Guidelines for Tuning Rules Over Time',
    content: `
### Objective
Minimize false positives (FPs) and false negatives (FNs) to improve SIEM effectiveness and reduce analyst fatigue.

### Process
1.  **Regular Review:** Prioritize noisy or new rules.
2.  **Analyze False Positives:** Investigate *why*. Common causes: low thresholds, broad logic, legitimate unusual activity. Tuning: Adjust thresholds, add exclusions/whitelists (sparingly), refine logic, use contextual enrichment.
3.  **Analyze False Negatives:** Harder. Discover via threat hunting, post-incident analysis, red teaming. Tuning: Broaden logic (carefully), lower thresholds (carefully), create new rules, improve log coverage.
4.  **Documentation & Change Management:** Document all changes, version control rules, test changes.
5.  **Feedback Loop & Stay Updated.**
    `.trim(),
  },
];

export const DELIVERABLES_CHECKLIST: DeliverableItem[] = [
  {
    id: 'del-iac',
    title: 'Infrastructure as Code (IaC)',
    description: 'An Ansible playbook or Terraform module that spins up the SIEM (ELK or Sentinel) and configures data connectors.',
    pdfReference: 'Page 2, Item 1',
    appLink: 'artifacts' as ViewType,
    appLinkText: 'View IaC Examples'
  },
  {
    id: 'del-rules-dashboards',
    title: 'Detection Rules & Dashboards',
    description: 'Exported KQL (or Elasticsearch DSL) rules and a JSON/NDJSON of the dashboard containing visualizations.',
    pdfReference: 'Page 2, Item 2',
    appLink: 'rules' as ViewType, // Or 'dashboard'
    appLinkText: 'View Detection Rules & Dashboard Info'
  },
  {
    id: 'del-response-scripts',
    title: 'Response Scripts/Playbooks',
    description: 'Python or Logic App flows that post Slack alerts, update firewall/WAF rules, and rotate keys.',
    pdfReference: 'Page 2, Item 3',
    appLink: 'playbooks' as ViewType,
    appLinkText: 'View Playbook Examples'
  },
  {
    id: 'del-runbook',
    title: 'Runbook Documentation (1-2 pages)',
    description: '1. How to onboard a new microservice\'s logs. 2. Steps for responding to two high-severity incidents. 3. Guidelines for tuning rules over time.',
    pdfReference: 'Page 2, Item 4',
    appLink: 'runbook' as ViewType,
    appLinkText: 'View Runbook'
  },
  {
    id: 'del-cicd-snippet',
    title: 'CI/CD Snippet',
    description: 'A pipeline fragment (e.g., GitHub Actions or Azure Pipelines YAML) showing how to validate “no critical alerts” before merging/deployment.',
    pdfReference: 'Page 2, Item 5',
    appLink: 'artifacts' as ViewType, // Specifically to the CI/CD section
    appLinkText: 'View CI/CD Snippet'
  }
];
