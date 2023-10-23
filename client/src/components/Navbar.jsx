import React, { useEffect, useMemo, useState } from 'react'
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Text from "@mui/material/Typography";

import AdbIcon from "@mui/icons-material/Adb";
import axios from "axios"
import { APis } from './Apis/Apis';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from './popup/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { AuthCheckUser } from '../Redux/action';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
let pages = [
    {
        title: "Home",
        data: [],
        route: "/"
    },
    {
        title: "Brands",
        apiName: "brands",
        data: [],
        route: "/home"
    },
    {
        title: "Categories",
        apiName: "categories",
        data: [],
        route: "/home"
    },
    {
        title: "Service List",
        apiName: "serviceList",
        data: [],
        route: "/home"
    },
    // {
    //     title: "Men Fashion",
    //     apiName: "menFashionProducts",
    //     data: [],
    //     route: "/home"
    // },
    // {
    //     title: "Women Fashion",
    //     apiName: "womenFashionProducts",
    //     data: [],
    //     route: "/home"
    // },
    // {
    //     title: "Electronics",
    //     apiName: "electronicsProducts",
    //     data: [],
    //     route: "/home"
    // },
    // {
    //     title: "Products",
    //     apiName: "products",
    //     data: [],
    //     route: "/home"
    // },
]

export const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        dataPages: pages,
        AllData: {},
    })
    const [subMenuData, setSubMenuData] = useState([]);
    let checkUser = localStorage.getItem("user")
    const getuserPresent = useSelector((e) => e?.authcheck)
    const cartLength = useSelector((e) => e?.cartLength)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenSubMenu = (event, data, pageData) => {
        // setAnchorElNav(null);
        // setSubMenuData([]);
        setAnchorElNav(event.currentTarget);
        setSubMenuData(data);
        console.log("++++>", data);
        if (pageData.route.length > 0) {
            navigate(pageData?.route)
        }
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        setSubMenuData([]); // Clear subMenuData when closing the menu
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElNav(null);
        setAnchorElUser(null);
    };



    const getBrandData = async () => {
        try {
            const result = await axios.get(APis?.getBrandData)
            let data = result?.data?.data;
            const findIndexPage = state?.dataPages?.findIndex((e) => e?.apiName == "brands")
            let cloneData = [...state?.dataPages];
            cloneData[findIndexPage].data = data;
            setState(pre => ({ ...pre, dataPages: cloneData }))
            console.log("data", data)
        } catch (error) {
            console.log(error);
        }
    }
    const getCategoryData = async () => {
        try {
            const result = await axios.get(APis?.getCategoryData)
            let data = result?.data?.data;
            const findIndexPage = state?.dataPages?.findIndex((e) => e?.apiName == "categories")
            let cloneData = [...state?.dataPages];
            cloneData[findIndexPage].data = data;
            setState(pre => ({ ...pre, dataPages: cloneData }))
            console.log("data", data)
        } catch (error) {
            console.log(error);
        }
    }
    const getMenFationData = async () => {
        try {
            const result = await axios.get(APis?.getmenData)
            let data = result?.data?.data;
            const findIndexPage = state?.dataPages?.findIndex((e) => e?.apiName == "menFashionProducts")
            let cloneData = [...state?.dataPages];
            cloneData[findIndexPage].data = data;
            setState(pre => ({ ...pre, dataPages: cloneData }))
            console.log("data", data)
        } catch (error) {
            console.log(error);
        }
    }
    const getwomenFationData = async () => {
        try {
            const result = await axios.get(APis?.getwomenData)
            let data = result?.data?.data;
            const findIndexPage = state?.dataPages?.findIndex((e) => e?.apiName == "womenFashionProducts")
            let cloneData = [...state?.dataPages];
            cloneData[findIndexPage].data = data;
            setState(pre => ({ ...pre, dataPages: cloneData }))
            console.log("data", data)
        } catch (error) {
            console.log(error);
        }
    }
    const getProcductsData = async () => {
        try {
            const result = await axios.get(APis?.getProductsData)
            let data = result?.data?.data;
            const findIndexPage = state?.dataPages?.findIndex((e) => e?.apiName == "products")
            let cloneData = [...state?.dataPages];
            cloneData[findIndexPage].data = data;
            setState(pre => ({ ...pre, dataPages: cloneData }))
            console.log("data", data)
        } catch (error) {
            console.log(error);
        }
    }
    const getElectronicsData = async () => {
        try {
            const result = await axios.get(APis?.getPElectronicData)
            let data = result?.data?.data;
            const findIndexPage = state?.dataPages?.findIndex((e) => e?.apiName == "electronicsProducts")
            let cloneData = [...state?.dataPages];
            cloneData[findIndexPage].data = data;
            setState(pre => ({ ...pre, dataPages: cloneData }))
            console.log("data", data)
        } catch (error) {
            console.log(error);
        }
    }

    const ProvideDataForRoute = () => {
        // let data = state?.AllData ;
        let cloneData = [...state?.dataPages]
    }

    useMemo(() => {
        getBrandData();
        getCategoryData();
        ProvideDataForRoute();
        // getElectronicsData();
        // getProcductsData();
        // getwomenFationData();
        // getMenFationData();
    }, [])

    useEffect(() => {
        dispatch(AuthCheckUser(checkUser))
    }, [open, getuserPresent])


    const handleClose = () => {
        setOpen(false);
        checkUser = localStorage.getItem("user")
        dispatch(AuthCheckUser(checkUser))
        if (checkUser == undefined) {
            window.location.reload();
        }
    }

    const handleClickOpen = () => {
        // alert("sfdf");
        setOpen(true);
    }

    console.log("=====>==>", getuserPresent);

    const settings = ["Setting 1", "Setting 2", "Setting 3"];

    return (
        <>
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* Your logo and other elements */}

                        <Box
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseUserMenu}
                            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                        >
                            {state?.dataPages.map((page, index) => (
                                <Button
                                    key={index}
                                    onClick={(e) => handleOpenSubMenu(e, page?.data, page)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page?.title ? page?.title : page?.name}
                                </Button>
                            ))}
                        </Box>

                        {/* Submenu at the bottom of the AppBar */}
                        {subMenuData.length > 0 && (
                            <Popover
                                open={Boolean(anchorElNav)}
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    // borderRadius: "15px 10px 10px 10px",
                                    marginTop: "30px",
                                    zIndex: 1,
                                }}
                                onClose={handleCloseUserMenu}
                            >
                                <div style={{ padding: "16px" }} onClick={handleCloseNavMenu}>
                                    {subMenuData.map((item, index) => (
                                        <div key={index} style={{ margin: "5px" }}>
                                            <img
                                                src={`https://bazaar.ui-lib.com${item.image}`}
                                                alt={item.name}
                                                style={{ width: "50px", height: "30px", marginRight: "8px" }}
                                            />
                                            <span style={{ margin: "0px" }}>{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </Popover>
                        )}

                        {/* User menu */}
                        <Box sx={{ flexGrow: 0.02, display: "flex" }}>
                            <ShoppingBagIcon />
                            <Text sx={{
                                backgroundColor: "red", padding: "3.5px", borderRadius: "50%",
                                height: "20px", paddingTop: "-6px", paddingBottom: "7px", color: "white", fontSize: "11px"
                            }}>{cartLength}</Text>
                        </Box>
                        {getuserPresent ? <Box sx={{ flexGrow: 0.04 }}>
                            <Typography><Link style={{ color: "white", textDecoration: "none" }} to="/login">Login</Link></Typography>
                        </Box> :
                            <Box sx={{ flexGrow: 0.04 }}>
                                <Typography><Link style={{ color: "white", textDecoration: "none" }} onClick={handleClickOpen}>Logout</Link></Typography>
                            </Box>
                        }
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Logout open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} />
        </>
    )
}

// const pages = ['Home', 'Brands', 'Categories', 'Service List', 'Men Fashion', 'Women Fashion', 'Electronics', 'Products'];

