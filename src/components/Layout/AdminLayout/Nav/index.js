import { Box, Typography } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import NavItem from './NavItem'
import style from './Style'

function Nav() {
    const classes = style()

    return (
        <Box className={classes.root}>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        {/* Nav header */}
                        <Box className={classes.headNav}>
                            <MenuBookIcon
                                style={{
                                    fontSize: '50px',
                                    marginRight: '10px',
                                }}
                                className={classes.headIcon}
                            />
                            <Typography variant="h5">T Book ADMIN</Typography>
                        </Box>
                    </ListSubheader>
                }
                className={classes.list}
            >
                {/* Home */}
                <NavItem
                    home={true}
                    title="Home"
                    icon={CategoryOutlinedIcon}
                    to="/admin"
                ></NavItem>

                {/* Sách */}
                <NavItem
                    title="Sách"
                    icon={LibraryBooksIcon}
                    to="/admin/book"
                ></NavItem>

                {/* Danh mục */}
                <NavItem
                    title="Danh mục"
                    icon={CategoryOutlinedIcon}
                    to="/admin/category"
                ></NavItem>
            </List>
        </Box>
    )
}
export default Nav
