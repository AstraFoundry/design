import { Logo } from "@/components/logo";
import { uiTranslations } from "fumadocs-ui/i18n";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { i18n } from "./i18n";

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add({
    zh: {
      displayName: "简体中文",
      "Search(search trigger)": "搜索",
      "Search(search dialog)": "搜索文档",
      "No results found(search dialog)": "没有找到结果",
      "On this page(table of contents)": "本页内容",
      "No Headings(table of contents)": "没有标题",
      "Next Page(pagination)": "下一页",
      "Previous Page(pagination)": "上一页",
      "Language(language switcher)": "语言",
      "Choose a language(language switcher)": "选择语言",
      "Theme(site menu)": "主题",
      "Edit on GitHub(edit page)": "在 GitHub 上编辑",
      "Last updated on(page footer)": "最后更新",
      "Prop(type table)": "属性",
      "Type(type table)": "类型",
      "Default(type table)": "默认值",
      "Parameters(type table)": "参数",
      "Returns(type table)": "返回",
      "Copy Text(code block)(aria-label)": "复制代码",
      "Copied Text(code block)(aria-label)": "已复制",
      "Skip to Content(skip link)": "跳到正文",
      "Page Not Found(404 not found page)": "页面不存在",
      "Back to Home(404 not found page)": "回到首页",
      "Toggle Theme(theme switcher)(aria-label)": "切换主题",
      "Light(theme switcher)(aria-label)": "亮色",
      "Dark(theme switcher)(aria-label)": "暗色",
      "System(theme switcher)(aria-label)": "跟随系统",
      "Open Sidebar(sidebar)(aria-label)": "打开侧边栏",
      "Close Sidebar(sidebar)(aria-label)": "关闭侧边栏",
      "Collapse Sidebar(sidebar)(aria-label)": "收起侧边栏",
      "Toggle Menu(home layout header)(aria-label)": "菜单",
      "Close Search(search dialog)(aria-label)": "关闭搜索",
      "Open Search(search trigger)(aria-label)": "打开搜索",
    },
    en: { displayName: "English" },
  });

export const gitHubUrl = "https://github.com/AstraFoundry/design";

export function baseOptions(lang: string): BaseLayoutProps {
  return {
    i18n: true,
    nav: {
      title: (
        <span className="flex items-center gap-2 font-medium">
          <Logo className="size-5" />
          Sunbeam
        </span>
      ),
      url: `/${lang}`,
    },
    githubUrl: gitHubUrl,
    links: [
      {
        text: lang === "zh" ? "文档" : "Docs",
        url: `/${lang}/docs`,
        active: "nested-url",
      },
      {
        text: lang === "zh" ? "组件" : "Components",
        url: `/${lang}/docs/components/button`,
        active: "none",
      },
    ],
  };
}
