# Initial Design

**ADR-ID:** 0001

**Date:** 02/12/26

## Context
The first goal of this project is to establish an at-home server capable of remote development and publicly-accessible deployment. This requires the following to be established:

**Hardware Setup:** The hardware available is a spare laptop of mine that I plan to use as the at-home server. The machine itself could be used as the server, or a VM could be set up on the machine to act as the server. Using a VM increases security and maintainability, considering that if it were to be compromised you are able to wipe the machine and restore from a previous save state. This also adds a layer of complexity and decreases performance, as the entire laptops compute and memory cannot be allocated to the VM.

**Security Measures:** Hosting any service using a laptop connected to your home internet is dangerous and requires rigorous security measures. One option is to install a VPN such as WireGuard directly onto the router and only require incoming traffic from your home internet. Another option would be to use an encrypted peer-to-peer connection with a service such as TailScale. Router compatibility should be assessed.

**Development & Production Environment Setup:** After the hardware is set up and networking is secure, the ideal goal for development would be local development on my personal laptop (not the server laptop) with the ability to remote ssh into the server securely from anywhere as well as automatic CI/CD from the repository onto the server. Given that remote SSH must be tightly secured, regular GitHub Actions runners will not be able to access the server. The options remaining include using self-hosted runners, configuration GitHub Actions runners to use the VPN setup implemented, or local CI/CD from my personal laptop using the existing VPN configurations.

## Decision

The following decisions were made while prioritizing security and automated development.

**Hardware Setup:** The spare laptop is running a VM with Ubuntu 24.04 LTS that will act as the remote server. This provides the most security with save state backups and a hard boundary between the VM and the laptop OS.

**Security Measures:** The router in my home is not capable of having a VPN installed on it, and the next best option is using TailScale. The VM is set up to accept only two inbound locations: SSH traffic from TailScale, website traffic from cloudflared to a reverse proxy container (nginx). This keeps maximum security while providing SSH access from my personal laptop from any other network using TailScale's P2P connection, which uses WireGaurd-encryption.

**Development & Production Environment Setup:** TailScale has been decided on for remote SSH access, which rules out GitHub Actions runners. To avoid having to either expose another port for GitHub websockets to pull and redploy or regularly poll GitHub for changes to the repository, local CI/CD is favored. This is implemented using a Makefile with a single `release` target that builds service images, pushed to GHCR, connects from my laptop to the server over SSH, pulls the latest repo and images, and redeploys. Images are tagged using SHA256 for flexibility.

## Consequences

Security has been maximized while maintaining powerful development capabilities with the following features:
- Ability to nuke the VM as necessary
- VM restoration from save state
- Hard boundary between VM and laptop OS
- Inbound traffic exclusive to WireGuard-encrypted SSH traffic from my personal laptop and website traffic through cloudflared and a reverse proxy
- Automatic deployment through local and server-side Makefile
- Tagged images managed via GHCR
