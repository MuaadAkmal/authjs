"use client";
import { useState } from "react";
import { Switch } from "./ui/switch";

export default function Notification() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  return (
    <div>
      <Switch
        checked={notificationsEnabled}
        onCheckedChange={setNotificationsEnabled}
      />
    </div>
  );
}
