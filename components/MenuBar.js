// Imports
import Link from 'next/link';
import {Menu} from 'semantic-ui-react';
import {AuthContext} from '../context/auth';
import {useEffect, useState, useContext} from 'react';





// Main Function
const MenuBar = () => {


    // Context
    const {logout, user} = useContext(AuthContext);


    // Tabs
    const [activeItem, setActiveItem] = useState('home');
    const handleItemClick = (e, {name}) => setActiveItem(name);
    useEffect(() => {
        const tab = window.location.pathname.split('/')[1];
        setActiveItem(tab);
    }, []);


    // Logout
    const logoutHandler = () => {

    };


    // Menu Bar
    const menuBar = user
        ? (
                <Menu pointing secondary size='massive' color='teal'>
                    <Menu.Item
                        name={user.username}
                        active
                        as={Link}
                        href='/'
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            onClick={logout}
                        />
                    </Menu.Menu>
                </Menu>
            )
        : (
                <Menu pointing secondary size='massive' color='teal'>
                    <Menu.Item
                        name='Home'
                        active={activeItem === ''}
                        onClick={handleItemClick}
                        as={Link}
                        href='/'
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='login'
                            active={activeItem === 'login'}
                            onClick={handleItemClick}
                            as={Link}
                            href='/login'
                        />
                        <Menu.Item
                            name='register'
                            active={activeItem === 'register'}
                            onClick={handleItemClick}
                            as={Link}
                            href='/register'
                        />
                    </Menu.Menu>
                </Menu>
            )


    return menuBar;
};





// Export
export default MenuBar;