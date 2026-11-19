
# Sunbeam 组件库补全：设计稿

第 1 轮的回答已经写进来了，这一版是完整设计稿。标着「我的判断」的地方是我替你做的决定，请重点看这些；有问题直接评论。确认没问题后我就照这份稿子开工。

## 意图

Sunbeam（`@astrafoundry/design` + MyGo 包）的地基已经很扎实：`sunbeam.json` 是 token 的单一来源；平面和浮起两种材质按层继承；有四条缓动曲线和同心圆角。缺的是组件层和文档。现在自有组件只有 Button、IconButton、LinkButton、Segmented、Panel，表单和浮层都借用 vendored 的 beUI，API 与无障碍做法不统一，也没有可以对照使用的文档站。

这套系统为高效交互服务。UI 本身要清晰、明快、精确：反馈来得快，状态一眼能看清。人文主义的摩擦感交给背景，也就是 backdrop 库里那些印象派式、动态模糊的自然照片；叠在照片上的 UI 不带任何纹理和怀旧感。平面和轻拟物（浮起材质）是同一门设计语言的两种材质，按「层」使用，不按组件挑。

做完之后，产品团队（astrafoundry.si、Lyra、Arion、Telo）和 coding agent 应该能只靠 Sunbeam 搭出一个完整的产品界面，不需要再引入第二个组件库，并且有一份带实时 demo 的双语文档可以对照。

## 已定

- 覆盖面和规范对齐 coss ui、Base UI、beUI、Vercel UI SDK（你定的）。
- 交付带 demo 的完整规范文档站，参照 coss.com/ui 与 ui.lobehub.com（你定的）。
- 交互原语用 Base UI（`@base-ui/react` 1.x）打底（你定的）。
- 和新组件重叠的 beUI 组件被取代并标记弃用；Agent 类和文字动效类保留，并纳入文档（你定的）。
- 人文摩擦感来自印象派式的照片背景，UI 清晰明快；不引入「暖纸」之类的质感（你在评论里定的）。
- 文档站：`apps/docs`，Next.js + Fumadocs + MDX（你定的）。
- 文档中英双语，默认中文（你定的）。
- Web 和 MyGo 同步补全（你定的）。
- 现有 token、材质系统、曲线和单一来源都保留；组件只用语义 token，不写 `dark:`，也不写物理颜色（我的判断，沿用现有规则）。
- 每个组件交付前都在浏览器里亲自验收 light/dark、键盘、手机宽度和 reduced-motion（你定的）。

## 目标、非目标、反目标

**目标**

- Web 端补齐下文清单里的组件，每个组件都有行为测试、材质规则、动效规格和文档页。
- MyGo 端为有原生原语的组件提供同名的 Sunbeam 版本。
- 规范（DESIGN.md、Sunbeam skill）补上组件、动效时长和「明快 + 照片摩擦」的语言定义。
- 文档站可以本地运行、可以静态构建，每个组件页都有可交互 demo。

**非目标**

- 这次不部署文档站的线上域名（构建产物可以直接部署，部署本身另说）。
- 不改品牌色、字体和现有 token 的数值。
- 不重写 Agent 类 beUI 组件。

**反目标（你没填第 7 题，这几条是我的判断，也就是我对「失败」的定义）**

- 看起来像 shadcn 换了个皮：每个组件都必须能看出 Sunbeam 的材质和同心圆角；每屏只有一处黄（按屏计，不按组件计，组件本身多数不用黄）。
- 同一个控件有两套写法（新 Checkbox 和 beUI Checkbox 并存而且都推荐用）。
- 动效花哨或者循环：交互反馈要快，播一次就停住。
- 任何组件在 dark 模式、键盘操作或 reduced-motion 下坏掉。

## 设计语言：明快 + 照片摩擦

补进 DESIGN.md 和 skill 的新定义如下：

- **明。**状态靠对比和形体表达，不靠颜色堆叠。选中、开启、勾选用墨色（`--foreground`）实心；黄色仍然只留给唯一的主操作或结果（Switch、Checkbox 选中时都不用黄）。
- **动。**每次输入都在 100ms 内给出可见反馈：按下下沉到 0.97，拨动开关时滑块带轻微过冲停到档位，浮层从触发点用 spring 长出来。
- **轻快。**浮层进场 160–240ms，出场比进场快约 40%；没有装饰性的入场动画，也没有循环。
- **摩擦。**只出现在照片背景里：动态模糊的自然照片放在 Hero、空状态、Onboarding、文档首页和 demo 舞台下。照片上永远只有一个实心的焦点面。组件本身不加纹理、不加颗粒，也不仿纸。
- **平面与轻拟物并行。**页面和窗口外框是平面，浮在上面的层（面板、弹层、菜单、对话框、抽屉、Toast）是浮起材质，层里的控件也随之浮起。这条是现有规则，新组件全部遵守。

## 原语与包结构

- `@base-ui/react` 作为 `dependencies`，跟随 1.x（我的判断：和 coss 一样作为直接依赖，使用者不用自己装）。
- 新组件放在 `packages/web/src/ui/`，一个组件一个文件，从 `@astrafoundry/design/ui` 导出。复合组件用 Base UI 的点号写法（`Dialog.Root`、`Dialog.Popup`…），同时导出常用的预组合版本（如 `Tooltip` 可以直接 `<Tooltip content="…">`）。
- 样式状态全部读 Base UI 的 data 属性（`data-open`、`data-checked`、`data-starting-style`、`data-ending-style`…），动画用 CSS transition，不依赖 `motion`（我的判断：更轻，SSR 没有水合问题；`motion` 仍然留给 beUI 和 mock 舞台）。
- 所有可见文案都从 props 传入，组件内不写英文默认值；需要默认无障碍文案时（比如关闭按钮的 label），设为必填 prop。
- 运行时依赖：Base UI 没有的原语可以引入小而专的依赖。我的判断：Calendar/DatePicker 用 `react-day-picker`（可选 peer，和 coss 相同）；Command 用 Base UI 的 Autocomplete 加 Dialog 组合，不引入 cmdk；Drawer 的拖拽阻尼和 Toast 的横滑都用 Base UI 自带的能力，或者手写 pointer 事件，不引入手势库。
- 弃用的 beUI 组件（我的判断，明确列出）：`motion/checkbox`、`motion/input`、`motion/select`、`motion/otp-input`、`motion/bouncy-accordion`、`motion/popover-morph`、`motion/center-morph-modal`。其余（loader、button、theme-toggle、magnetic、marquee、action-swap、preview-rail、文字动效、全部 agents）保留。产品仓库的迁移不在本次范围内，弃用注释写明替代者即可。
- DESIGN.md 和 skill 里描述背景色的「warm paper」改成不暗示质感的说法（比如「warm light ground」）；token 数值不动（我的判断）。
- 版本升到 0.2.0，全部完成后发一次版；开发期间按族分别提交，每次提交都要通过 `pnpm check`（我的判断）。被取代的 beUI 导出保留，加 `@deprecated` 注释并指向新组件；`LocaleSwitch` 改用新的 Popover/Menu。

## 组件清单与材质

「材质」一列说明组件放在平面层和浮起层里分别长什么样。「MyGo」一列是 MyGo v0.8.3 中可以直接包装的原生原语；标「—」的这次只做 Web。

|  |
|---|
|  |
|  |
|  |
|  |
|  |
|  |

**这次不做（我的判断）：**Cropper、Resizable、Tree、Multiselect、Timeline、Stepper。它们要么依赖较重，要么在你们的产品里还没有出现过使用场景。清单里要是缺了你必须要的，请在评论里点名。

**危险操作（我的判断）：**不新增红色填充按钮。状态色按规则只用于图标和圆点，所以破坏性确认用 `secondary` 按钮加危险图标，AlertDialog 的标题明确写出后果。

## 动效规格

在 `sunbeam.json` 新增 `motion` 段（时长 + 现有四条曲线），由生成器写进 CSS 变量、DESIGN.md 和 Go token。曲线不变。

|  |
|---|
|  |
|  |
|  |
|  |
|  |
|  |
|  |
|  |
|  |

reduced-motion：所有过渡直接跳到终态（`base.css` 现有的全局规则会兜底）；拖拽关闭仍然可用，只是没有回弹动画。

## 文档站

- **位置：**`apps/docs`，加入 pnpm workspace；直接引用工作区里的 `@astrafoundry/design` 源码，改了组件文档立即可见。
- **技术：**Next.js（App Router）+ Fumadocs + MDX，静态导出。用 Fumadocs UI 的布局、搜索和目录，皮肤换成 Sunbeam token；正文 demo、首页和组件预览全部用 Sunbeam 组件（我的判断：文档站不发布，借用 Fumadocs 的外框不违反「不引入第二个组件库」）；Fumadocs 的 i18n 提供 `/zh`（默认）和 `/en`；整站皮肤用 Sunbeam 自己的 token 和组件（文档本身就是一个示范）。
- **首页：**参照 lobehub 的展示页。Hero 用 backdrop 照片和一个实心焦点面，下面是组件陈列墙（真组件，可以操作），然后是材质对比和动效示范。
- **基础页：**设计语言、颜色、字体、材质、圆角与间距、动效、照片背景、文案、Agent 规则（skill 与 DESIGN.md）。
- **组件页结构**（每页一致，参照 coss）：标题与一句话 → 主 demo → 安装与引入 → 何时用 / 何时不用 → 示例（多个 demo）→ 材质（同一 demo 放在平面和浮起层里对比）→ 动效（规格表 + 可以重放的 demo）→ 可访问性（键盘表）→ API（props 表）→ Do / Don't。
- **Demo 组件：**`<Demo>` 渲染实时预览和 shiki 高亮的源码，带「预览/代码」切换、亮/暗切换、平面/浮起切换、复制按钮。demo 文件放在 `apps/docs/demos/<component>/*.tsx`，中英两种语言共用同一份，文案从 props 或字典传入。
- **beUI 页：**Agent 组件和文字动效各有一页。被弃用的组件页顶部写明替代者。

## MyGo

- 上表 MyGo 列里的组件，都在 `packages/mygo/sunbeam` 新增同名函数，基于 `ui.*Base` 原语，颜色走 `sunbeam.Colors(c)`，材质走 `Face`、`Well`、`Thumb`、`PanelSurface`。
- 动效时长读新生成的 Go motion token；MyGo 不支持的动画以静态终态为准（我的判断）。
- gallery 扩充为按族分页，headless 快照测试覆盖 light/dark；README 截图重新生成。

## 验收

- 每个 Web 组件都有 vitest + Testing Library 的行为测试：角色与 aria、键盘路径、受控/非受控、标签必填、平面/浮起两种层下的 class。
- `pnpm check`（类型、lint、测试、构建、gofmt、vet、go test）全部通过；文档站 `build` 通过。
- 浏览器验收：我逐页打开文档站，看 light/dark、375px 宽度、只用键盘走一遍、开 reduced-motion 各看一遍，截图记进 verify 报告。
- MyGo：gallery 快照测试覆盖新组件。

## 交付顺序

1. **地基**
引入 Base UI；在 `sunbeam.json` 加 motion token 和生成器；搭起文档站骨架、Demo 组件和基础页。

1. **表单族**
Field 到 OTPField，Web + MyGo，并补上文档页。

1. **浮层族**
Popover 到 Command；把 LocaleSwitch 迁过来；标记 beUI 弃用。

1. **导航、展示、日期族**
同上。

1. **规范与首页**
更新 DESIGN.md、skill、README；做文档首页陈列墙；生成截图。

1. **总验收**
全站浏览器走查和 verify 报告。

## 留给实现时决定

- 每个组件 props 的具体命名（以 Base UI 为准，必要时简化）。
- Fumadocs 的具体版本和目录约定。
- MyGo 各原语的具体 API 适配方式。

## 相关文档

- 本设计稿：document `sunbeam-completion`，`.ryugi/artifacts/document/sunbeam-completion/doc.xml`；第 1 轮的问答和评论都在这里。获批后另存到 `docs/ryugi/specs/2026-11-19-sunbeam-completion-design.md`。
- 对照来源：coss ui 的 71 个 registry 组件（`cosscom/ui`，基于 Base UI）；Vercel UI SDK 的 52 个组件（`vercel-labs/ui`）；Base UI 1.9；astrafoundry.si/design。

