"use client";

import {
  Avatar,
  Badge,
  Button,
  Card,
  CardDescription,
  CardTitle,
  Checkbox,
  Field,
  FieldLabel,
  IconButton,
  Input,
  Kbd,
  Label,
  Menu,
  MenuItem,
  MenuPopup,
  MenuTrigger,
  Meter,
  Panel,
  Progress,
  Segmented,
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
  Tab,
  Tabs,
  TabsList,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipProvider,
} from "@astrafoundry/design/ui";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Camera,
  Download,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import type { DocsLang } from "../lang";

const T = {
  zh: {
    capture: "截取",
    orientation: "方向",
    portrait: "纵向",
    landscape: "横向",
    download: "下载",
    timer: "定时",
    quality: "画质",
    storage: "存储",
    storageNote: "已用 7.2 GB，共 10 GB",
    manage: "管理",
    healthy: "正常",
    email: "工作邮箱",
    remember: "记住这台设备",
    signIn: "登录",
    view: "视图",
    week: "周",
    month: "月",
    year: "年",
    align: "对齐",
    left: "左对齐",
    center: "居中",
    right: "右对齐",
    region: "区域",
    more: "更多",
    rename: "重命名",
    duplicate: "复制",
    archive: "归档",
    uploading: "上传中",
    volume: "音量",
    search: "搜索",
    overview: "概览",
    activity: "动态",
    settings: "设置",
  },
  en: {
    capture: "Capture",
    orientation: "Orientation",
    portrait: "Portrait",
    landscape: "Landscape",
    download: "Download",
    timer: "Timer",
    quality: "Quality",
    storage: "Storage",
    storageNote: "7.2 GB of 10 GB used",
    manage: "Manage",
    healthy: "Healthy",
    email: "Work email",
    remember: "Remember this device",
    signIn: "Sign in",
    view: "View",
    week: "Week",
    month: "Month",
    year: "Year",
    align: "Align",
    left: "Align left",
    center: "Align center",
    right: "Align right",
    region: "Region",
    more: "More",
    rename: "Rename",
    duplicate: "Duplicate",
    archive: "Archive",
    uploading: "Uploading",
    volume: "Volume",
    search: "Search",
    overview: "Overview",
    activity: "Activity",
    settings: "Settings",
  },
} as const;

const regions = { fra: "Frankfurt", sin: "Singapore", hnd: "Tokyo" };

/** A wall of live components, each one usable, set on the canvas grid. */
export function Showcase({ lang }: { lang: DocsLang }) {
  const t = T[lang];
  const [orientation, setOrientation] = useState("portrait");
  const [range, setRange] = useState("week");
  return (
    <TooltipProvider>
      <div className="grid items-start gap-4 md:grid-cols-3">
        <Panel className="flex flex-col gap-2">
          <Segmented
            label={t.orientation}
            value={orientation}
            onValueChange={setOrientation}
            className="w-full"
            options={[
              { value: "portrait", label: t.portrait },
              { value: "landscape", label: t.landscape },
            ]}
          />
          <div className="flex gap-2">
            <Button className="flex-1">
              <Camera aria-hidden className="size-4" /> {t.capture}
            </Button>
            <Tooltip content={t.download}>
              <IconButton label={t.download}>
                <Download aria-hidden />
              </IconButton>
            </Tooltip>
          </div>
          <div className="flex items-center justify-between px-2 pt-1 pb-1">
            <Label className="gap-3">
              <Switch defaultChecked /> {t.timer}
            </Label>
            <Kbd>⌘T</Kbd>
          </div>
        </Panel>

        <Card className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{t.storage}</CardTitle>
              <CardDescription>{t.storageNote}</CardDescription>
            </div>
            <Badge tone="success">{t.healthy}</Badge>
          </div>
          <Meter value={72} aria-label={t.storage} />
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {["Ada Lovelace", "Grace Hopper", "Alan Turing"].map((n) => (
                <Avatar key={n} name={n} size="sm" className="ring-2 ring-card" />
              ))}
            </div>
            <Button variant="secondary" size="sm">
              {t.manage}
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col gap-3">
          <Field>
            <FieldLabel>{t.email}</FieldLabel>
            <Input type="email" placeholder="ada@astra.so" />
          </Field>
          <Label>
            <Checkbox defaultChecked /> {t.remember}
          </Label>
          <Button variant="secondary">{t.signIn}</Button>
        </Card>

        <Card className="flex flex-col gap-5 md:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Tabs defaultValue="overview">
              <TabsList aria-label={t.view}>
                <Tab value="overview">{t.overview}</Tab>
                <Tab value="activity">{t.activity}</Tab>
                <Tab value="settings">{t.settings}</Tab>
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-2">
              <Segmented
                label={t.view}
                value={range}
                onValueChange={setRange}
                options={[
                  { value: "week", label: t.week },
                  { value: "month", label: t.month },
                  { value: "year", label: t.year },
                ]}
              />
              <Menu>
                <MenuTrigger render={<IconButton label={t.more} variant="ghost" />}>
                  <MoreHorizontal aria-hidden />
                </MenuTrigger>
                <MenuPopup align="end">
                  <MenuItem shortcut="⌘R">{t.rename}</MenuItem>
                  <MenuItem shortcut="⌘D">{t.duplicate}</MenuItem>
                  <MenuItem>{t.archive}</MenuItem>
                </MenuPopup>
              </Menu>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span>{t.uploading}</span>
              <span className="text-muted-foreground tabular-nums">64%</span>
            </div>
            <Progress value={64} aria-label={t.uploading} />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Slider aria-label={t.volume} defaultValue={40} className="max-w-48" />
            <ToggleGroup aria-label={t.align} defaultValue={["left"]}>
              <ToggleGroupItem value="left" aria-label={t.left}>
                <AlignLeft aria-hidden />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label={t.center}>
                <AlignCenter aria-hidden />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label={t.right}>
                <AlignRight aria-hidden />
              </ToggleGroupItem>
            </ToggleGroup>
            <Select items={regions} defaultValue="fra">
              <SelectTrigger aria-label={t.region} size="sm" className="min-w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectPopup>
                {Object.entries(regions).map(([v, l]) => (
                  <SelectItem key={v} value={v}>
                    {l}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
          </div>
        </Card>

        <Panel scheme="dark" className="flex flex-col gap-2 self-start">
          <Segmented
            label={t.quality}
            value="hd"
            onValueChange={() => {}}
            className="w-full"
            options={[
              { value: "sd", label: "SD" },
              { value: "hd", label: "HD" },
              { value: "4k", label: "4K" },
            ]}
          />
          <Button variant="secondary" className="w-full">
            {t.download}
          </Button>
        </Panel>
      </div>
    </TooltipProvider>
  );
}
