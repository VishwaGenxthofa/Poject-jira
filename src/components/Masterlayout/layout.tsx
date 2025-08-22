// app/layout.tsx

import Page from "../Dashboard/Sidebar/Pages";


export default function Layout({ children }:any) {
  return (
    <Page>{children}</Page>
  );
}
