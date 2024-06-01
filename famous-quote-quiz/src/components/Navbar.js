import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');


    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            {isMobile ? (
                <>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Famous Quotes Application
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                    >
                        <List>
                            <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
                                <ListItemText primary="Home" />
                            </ListItem>
                            <ListItem button component={Link} to="/settings" onClick={toggleDrawer(false)}>
                                <ListItemText primary="Settings" />
                            </ListItem>
                            {user && (
                                <ListItem button onClick={() => { handleLogout(); toggleDrawer(false); }}>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            )}
                        </List>
                    </Drawer>
                </>
            ) : (
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Famous Quotes Application
                        </Typography>
                        <Button component={Link} to="/" color="inherit">Home</Button>
                        <Button component={Link} to="/settings" color="inherit">Settings</Button>
                        {user && <Button onClick={handleLogout} color="inherit">Logout</Button>}
                    </Toolbar>
                </AppBar>
            )}
        </>
    );
}

export default Navbar;
