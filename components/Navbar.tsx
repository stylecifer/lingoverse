// AppNavbar.tsx
import { SearchIcon } from "./SearchIcon";
import React, {useEffect} from "react";
import { Button, Navbar, Text, Avatar, Dropdown, Input } from "@nextui-org/react";
import LingoLogo from "./LingoLogo";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import NavbarContent from "@nextui-org/react/types/navbar/navbar-content";


export const AppNavbar: React.FC = () => {
  const supabaseClient = useSupabaseClient();
  const user  = useUser();
  const router = useRouter();

  function signOutUser() {
    supabaseClient.auth.signOut();
    router.push("/"); //localhost
  }

  return (
    <Navbar isBordered variant="sticky">
        <Navbar.Brand>      
             <LingoLogo />
        </Navbar.Brand>

        <Navbar.Content
          enableCursorHighlight
          activeColor="secondary"
          hideIn="xs"
          variant="highlight-rounded" >
            <Navbar.Link href="/meetings/all-meets">
              Meetings
            </Navbar.Link>
            <Navbar.Link href="/meetings/create-meeting">
              Create Meeting
            </Navbar.Link>
          </Navbar.Content>

        <Navbar.Content
                        css={{
                          "@xsMax": {
                            w: "100%",
                            jc: "space-between",
                          },
                        }}
        > 
          {!user ? 
          <Navbar.Link href="/login">
          <Button auto flat >
              Login
          </Button>
          </Navbar.Link>
          : 
            <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="primary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                Hey, {user?.email}
              </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                My Settings
              </Dropdown.Item>
              <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                Analytics
              </Dropdown.Item>
              <Dropdown.Item key="system">System</Dropdown.Item>
              <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item 
                key="logout" 
                withDivider 
                color="error">
              <Button auto flat onPress={()=>signOutUser()}>
                                Log Out
              </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          }
        </Navbar.Content>
      </Navbar>
  );
};