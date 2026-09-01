"use client";

import "@material/web/button/filled-button.js";
import "@material/web/button/outlined-button.js";
import "@material/web/button/text-button.js";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/icon/icon.js";
import "@material/web/labs/card/elevated-card.js";
import "@material/web/labs/navigationbar/navigation-bar.js";
import "@material/web/labs/navigationtab/navigation-tab.js";
import "@material/web/labs/badge/badge.js";
import "@material/web/radio/radio.js";
import "@material/web/textfield/outlined-text-field.js";

export default function MaterialProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
