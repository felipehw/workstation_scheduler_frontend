import { AddToQueueOutlined, ComputerOutlined, MoreTimeOutlined, ScheduleOutlined } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import guillePurple from '../../assets/guille_purple.svg';
import logo from '../../assets/logo_white.svg';

const drawerWidth = 240;

export const RootPage = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar>
                <img src={guillePurple} alt="Logo" height="40px" />
            </Toolbar>
            <Divider />
            <List>
                <ListItem>
                    <ListItemText primary="Agendamentos" />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('schedule')}>
                        <ListItemIcon>
                            <ScheduleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Ver Agendamentos'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('schedule/create')}>
                        <ListItemIcon>
                            <MoreTimeOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Criar Agendamento'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem>
                    <ListItemText primary="Estações de trabalho" />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('workstation')}>
                        <ListItemIcon>
                            <ComputerOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Ver Estações'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('workstation/create')}>
                        <ListItemIcon>
                            <AddToQueueOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Criar Estação'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Sistema de agendamento
                    </Typography>
                    <Box sx={{ ml: 2, display: { sm: 'none' }, position: 'relative', top: '3px' }}>
                        <img src={logo} alt="Logo" height="40px" />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};
