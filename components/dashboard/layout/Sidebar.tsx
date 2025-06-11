"use client";

import React, {  } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { usePathname } from "next/navigation";
import { sidebarConfig, whatsNewConfig } from "./sidebarlink";
import { NavItem } from "./nav-item";
import { Separator } from "@/components/ui/separator";

interface CollapsibleIconProps {
  open: boolean;
}

const CollapsibleIcon = ({ open }: CollapsibleIconProps) =>
  open ? (
    <ChevronDown size={16} className="text-muted-foreground" />
  ) : (
    <ChevronRight size={16} className="text-muted-foreground" />
  );

// --- Sidebar utama ---
export function Sidebar() {

  const path = usePathname();

  return (
    <aside className="h-full w-64 flex flex-col border-r pt-3 bg-background">
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {sidebarConfig.map((item, index) => {
            if (item.type === 'separator') {
              return <Separator key={`sep-${index}`} className="my-2" />;
            }
            // Cek apakah item ini adalah section dengan subItems
            if ("subItems" in item) {
              return (
                <Collapsible
                  key={index}
                  // Buka collapsible jika rute saat ini diawali dengan path salah satu sub-itemnya
                  defaultOpen={item.subItems.some((sub) => path.startsWith(sub.href))}
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full flex justify-between items-center font-normal text-sm h-9 hover:bg-primary hover:text-white">
                      <div className="flex items-center">
                        <item.icon size={16} className="mr-3" />
                        {item.title}
                      </div>
                      {/* Anda perlu membuat atau menyesuaikan CollapsibleIcon */}
                      <CollapsibleIcon open={path.startsWith(item.subItems[0].href.substring(0, item.subItems[0].href.lastIndexOf('/')))} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 pt-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <NavItem key={subIndex} href={subItem.href} icon={subItem.icon} isSubItem>
                        {subItem.title}
                      </NavItem>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            } else {
              return (
                <NavItem key={index} href={item.href} icon={item.icon} className="mb-1">
                  {item.title}
                </NavItem>
              );
            }
          })}
        </div>
      </ScrollArea>

      {/* Bagian What's New */}
      <div className="p-2">
        <Separator/>
        <div className="p-2 space-y-1">
          <h3 className="px-2 text-xs font-semibold text-muted-foreground tracking-wider mb-2">
            What&apos;s New
          </h3>
          {whatsNewConfig.map((item, index) => (
            <NavItem key={index} href={item.href} icon={item.icon}>
                {item.title}
            </NavItem>
          ))}
        </div>
      </div>
    </aside>
  );
}
