import React from "react";

export function setActionModal(
  setter: React.Dispatch<React.SetStateAction<boolean>>,
  getter: boolean
) {
  setter(!getter);
}
