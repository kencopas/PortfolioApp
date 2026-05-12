import { Project } from "@/components/projects/ProjectCard";

const incidentResponseSRA: Project = {
  id: "incident_response_sra",
  title: "Incident Response Source Reference App",
  description:
    "Modular incident response platform with multi-model LLM integration, enterprise retrieval pipelines, and Azure-ready deployment architecture",
  stack: ["Flask", "React", "ChromaDB", "Docker"],
};

const applicationExpertAgent: Project = {
  id: "application_expert_agent",
  title: "Application Expert Agent",
  description:
    "AI-powered incident triage platform using knowledge graphs, vector search, and MCP orchestration for real-time operational expertise",
  stack: ["React", "Neo4j", "ChromaDB", "FastMCP"],
};

const aiAcademy: Project = {
  id: "ai_academy",
  title: "AI Academy",
  description:
    "Enterprise AI enablement initiative delivering MCP, Copilot, and AI-assisted SDLC training for engineering and QA teams",
  stack: ["Python", "Java", "GitHub Copilot", "Model Context Protocol"],
};

const contentManagementAutomation: Project = {
  id: "content_management_automation",
  title: "Content Management Intelligent Automation",
  description:
    "Agentic content automation workflow integrating Jira, proprietary CMS tooling, and MCP-driven orchestration for large-scale content operations",
  stack: ["Python", "FastMCP", "Jira", "Tridion Sites"],
};

const qualityEngineeringAssistant: Project = {
  id: "quality_engineering_ai_assistant",
  title: "Quality Engineering AI Assistant",
  description:
    "AI-assisted browser automation framework integrating Jira workflows and MCP tooling for scalable UI validation and test execution",
  stack: ["Python", "Cursor", "Jira", "Model Context Protocol"],
};

const gitlabMcpServer: Project = {
  id: "gitlab_mcp_server",
  title: "GitLab MCP Server",
  description:
    "Secure IDE-native GitLab integration server enabling authenticated issue management workflows directly within developer environments",
  stack: ["Python", "FastMCP", "GitLab", "OAuth"],
};

const boardGameApplication: Project = {
  id: "board_game_application",
  title: "Board Game Application",
  description:
    "Cross-platform multiplayer board game platform with event-driven backend architecture and synchronized real-time gameplay state management",
  stack: ["Python", "Flutter", "Dart", "FastAPI"],
};

const homeServerPortfolio: Project = {
  id: "home_server_portfolio",
  title: "Home Server / Portfolio Application",
  description:
    "Self-hosted application platform with containerized deployments, telemetry services, and modern full-stack portfolio infrastructure",
  stack: ["Python", "PostgreSQL", "Next.js", "TypeScript"],
};

const robertRoboticsPlatform: Project = {
  id: "robert_robotics_platform",
  title: "Multimodal Robotics Platform (RoBert)",
  description:
    "Distributed robotics platform combining edge devices, WebSocket streaming, and cloud-based AI inference for real-time perception and control",
  stack: ["Python", "C", "Machine Learning", "ESP32"],
};

export const projects: Project[] = [
  incidentResponseSRA,
  applicationExpertAgent,
  qualityEngineeringAssistant,
  contentManagementAutomation,
  aiAcademy,
  gitlabMcpServer,
  robertRoboticsPlatform,
  homeServerPortfolio,
  boardGameApplication,
];
