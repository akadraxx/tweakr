# Accessibility Statement

> **Tweakr** is committed to providing an accessible, inclusive experience for all users—regardless of ability or assistive setup. Optimizing system performance and tuning Windows should be effortless for everyone.

---

## 🎯 Priorities & Commitments

Tweakr aspires to adhere to the **Web Content Accessibility Guidelines (WCAG) 2.1 Level AA** standards. We actively focus on the following primary areas:

* ⌨️ **Keyboard Navigation:** Full operational coverage using standard keyboard inputs (`Tab`, `Shift+Tab`, `Enter`, `Space`, and arrow keys) across tabs, tweak cards, and power plan selectors.
* 🗣️ **Screen Reader Compatibility:** Providing clear ARIA roles, live states, and context so tools like Windows Narrator and NVDA accurately announce toggle states (`Active` vs. `Default`).
* 👁️ **Visual Clarity & High Contrast:** Ensuring text and UI toggles maintain readable contrast ratios against our dark theme, accompanied by distinct visual state indicators.

---

## 🛠️ Contributor Expectations

When contributing to Tweakr’s user interface, please observe the following accessibility guardrails:

* **Semantic HTML First:** Prioritize native HTML elements (`<button>`, `<input>`, `<a>`) over `div` elements with click handlers.
* **ARIA Attributes:** Custom interactive elements (e.g., toggle switches) must specify explicit ARIA states (`role="switch"`, `aria-checked`, and focusable `tabIndex={0}`).
* **Keyboard Parity:** Any custom element with an `onClick` event must provide matching keyboard support (`onKeyDown` handling for `Enter` and `Space`).
* **Visible Focus:** Never remove focus outlines (`outline: none`) without supplying an equally visible custom focus indicator.

---

## 📢 Reporting Accessibility Barriers

If you encounter an accessibility barrier or usability issue, please file a report via our [GitHub Issues](https://github.com/AkaDraxx/tweakr/issues) page.

To help us resolve the issue efficiently, please provide:
1. **The goal:** What task were you attempting to perform?
2. **The barrier:** What unexpected behavior occurred?
3. **Environment:** Your Windows version (Windows 10 or 11).
4. **Assistive Tech:** Any assistive software in use (Windows Narrator, NVDA, Magnifier, On-Screen Keyboard).

> *Note: Screen recordings and screenshots are helpful but completely optional. You are never required to disclose personal medical or disability information.*

### Severity Triage

| Level | Impact | Description |
| :--- | :--- | :--- |
| 🔴 **Critical** | Blocker | Prevents access to core features with no keyboard/assistive workaround. |
| 🟡 **High** | Major Barrier | Significant difficulty completing a task, though an alternative path exists. |
| 🟢 **Medium / Low** | Minor / Polish | Cosmetic contrast flaws, missing tooltips, or minor layout quirks. |

### How We Respond

* **48–72 Hours:** Initial triage and confirmation of your report.
* **Status Updates:** Tracking via issue milestones and clear severity labels.
* **Verification:** Direct ping upon pre-release builds to confirm the barrier has been eliminated.

---

## 👥 Ownership & Maintenance

The accessibility roadmap is maintained by the core Tweakr development team (`AkaDraxx`). We audit UI views during feature releases and work toward integrating automated accessibility checks (`eslint-plugin-jsx-a11y`) into our build pipeline.

---

## 💻 Supported Environments

Tweakr is an Electron-based desktop application designed for Windows environments:

* **Operating Systems:** Windows 10 (64-bit), Windows 11 (64-bit)
* **Input Devices:** Mouse, Keyboard, Touchscreen
* **Assistive Technologies:** Windows Narrator, Windows Magnifier, NVDA

---

## ⚠️ Known Limitations

* **Frameless Title Bar:** Because Tweakr uses a frameless window (`frame: false`), the custom draggable region might not register as a standard window frame in certain screen readers.
* **Toggle Focus Outlines:** High-contrast focus outlines on custom toggle components are undergoing refinement to ensure stronger visibility against dark slate backgrounds.

---

## 💬 Feedback & Improvements

We welcome suggestions to improve this statement and our interface. Open a discussion or feature request in our [GitHub Discussions](https://github.com/AkaDraxx/tweakr/discussions) tab.
