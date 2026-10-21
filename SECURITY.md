# Security

Tweakr interacts with Windows registry keys (`HKCU` and `HKLM`) and runs system commands like `powercfg` to apply performance changes. 

Because the app runs with administrative privileges, keeping IPC communication safe and preventing arbitrary command execution is a priority.

## Reporting an Issue

If you find a security flaw or an issue with how system commands are executed:

1. **Please do not open a public issue.**
2. Report it privately through GitHub's [Security Advisory tab](https://github.com/AkaDraxx/tweakr/security/advisories/new).
3. Alternatively, you can reach out directly on Discord by joining the server: https://discord.gg/5WnRH2ff78
4. Include the steps to reproduce the bug and the version you are testing.

I'll review the report, push a patch, and credit you in the release notes.
