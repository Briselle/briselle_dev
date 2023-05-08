////import React, { Component } from 'react'
////import { Button, Icon, Input, Menu, Segment, Modal, Dropdown } from 'semantic-ui-react';

//export default function Navbar() {

//    return (
//        <div>
//            <div className="ui menu">
//                <a href="/" className="item">Home</a>

                
//                <a href="/" className="item right" position='right'><Input className='icon' icon='search' placeholder='Search...' /></a>
//                <a href="/display_setup" className="item" position='right'><Icon color='grey' name="settings" /></a>

                
//                <a href="/" className="item" position='right'><Icon color='grey' name="power off" /></a>

//                <a href="/" className="item" position='right'><Button primary>Sign up</Button></a>
//                <a href="/" className="item" position='right'><Button primary>Log-in</Button></a>
//            </div>

//            {/*<div className="ui menu">*/}
//            {/*    <a href="/display_objects" className="item">Display Objects</a>*/}
//            {/*    <a href="create_objects" className="item">Create Objects</a>*/}
//            {/*    <a href="create_fields" className="item">Create Fields</a>*/}
//            {/*    <a href="/load_form" className="item">Form</a>*/}
//            {/*    <a href="/display_values" className="item">View Values</a>*/}
//            {/*</div>*/}
//        </div>)
//}

// TODO: Update <Search> usage after its will be implemented
import React from 'react'
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react'

// TODO: Update <Search> usage after its will be implemented

const recentOptions = [

    {
        key: 'ObjectandFields',
        text: 'Object and Fields',
        value: 'ObjectandFields',
    },
    {
        key: 'UserManagement',
        text: 'User Management',
        value: 'UserManagement',

    },
    {
        key: 'Apps',
        text: 'Apps',
        value: 'Apps',

    },
    {
        key: 'PicklistValueSet',
        text: 'Picklist Value Set',
        value: 'PicklistValueSet',

    },
    {
        key: 'Email',
        text: 'Email',
        value: 'Email',

    },
]
const profileOptions = [

    {
        key: 'Profile',
        text: 'Profile',
        value: 'Profile',
    },
    {
        key: 'Preferences',
        text: 'Preferences',
        value: 'Preferences',
    },
    {
        key: 'ManageUsers',
        text: 'Manage Users',
        value: 'ManageUsers',
    },
]

const supportOptions = [

    {
        key: 'help',
        text: 'Help',
        value: 'help',
        icon: { color: 'grey', name: "help" },
    },
    {
        key: 'support',
        text: 'Get Support',
        value: 'support',
        icon: { color: 'grey', name: "headphones" },
    },
    {
        key: 'resourceCenter',
        text: 'Resource Center',
        value: 'resourceCenter',
        icon: { color: 'grey', name: "suitcase" },
    },
    {
        key: 'givefeedback',
        text: 'Give Feedback',
        value: 'givefeedback',
        icon: { color: 'grey', name: "comments" },
    },
]

const accessOptions = [
    {
        key: 'logout',
        text: 'Log Out',
        value: 'logout',
        icon: { color: 'grey', name: "log out" },
    },

]
const setupDefaultOptions = [

    {
        key: 'users',
        text: 'Users',
        value: 'users',
    },
    {
        key: 'email',
        text: 'Email',
        value: 'email',
    },
    {
        key: 'data',
        text: 'Data',
        value: 'data',
    },
]
const setupOptions = [

    {
        key: 'setup',
        text: 'Setup',
        value: 'setup',
        icon: { color: 'grey', name: "setting" },
    },
]
const setupsubOptions = [

    {
        key: 'CompanySettings',
        text: 'Company Settings',
        value: 'CompanySettings',
        icon: { color: 'grey', name: "building" },
    },
    {
        key: 'Security',
        text: 'Security',
        value: 'Security',
        icon: { color: 'grey', name: "protect" },
    },
    {
        key: 'DataClassification',
        text: 'Data Classification',
        value: 'DataClassification',
        icon: { color: 'grey', name: "cube" },
    },
    {
        key: 'Identity',
        text: 'Identity',
        value: 'Identity',
        icon: { color: 'grey', name: "id card" },
    },

]


const MenuExampleAttached = () => (
    <div>
        <Menu attached='top' position='right'>

            <Menu.Menu position='right'>
                <div className='ui right aligned category search item'>
                    <div className='ui transparent icon input'>
                        <input
                            className='prompt'
                            type='text'
                            placeholder='Search your keyword...'
                        />
                        <i className='search link icon' />
                    </div>
                    <div className='results' />
                </div>
            </Menu.Menu>
            
            <Menu.Menu >
                <div className='ui  aligned item right'>
                    <div className='ui transparent icon input'>
                        <Dropdown icon='wrench' className="right" pointing={true}>
                            <Dropdown.Menu>
                                
                                {setupDefaultOptions.map((option) => (
                                    <Dropdown.Item key={option.value} {...option} />
                                ))}

                                
                                <Dropdown.Divider />
                                <Dropdown.Header>Configuration</Dropdown.Header>
                                {setupOptions.map((option) => (
                                    <Dropdown.Item key={option.value} {...option} />
                                ))}

                                <Dropdown.Divider />
                                <Dropdown.Header>Settings</Dropdown.Header>
                                {setupsubOptions.map((option) => (
                                    <Dropdown.Item key={option.value} {...option} />
                                ))}
                                <Dropdown.Divider />
                                <Dropdown.Item>
                                    <Icon name='dropdown' />
                                    <span >Recent</span>
                                    <Dropdown.Menu className="left" pointing={true} floating="left">
                                            {recentOptions.map((option) => (
                                                <Dropdown.Item key={option.value} {...option} />
                                            ))}
                                        </Dropdown.Menu>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='results' />
                </div>
            </Menu.Menu>
            <Menu.Menu position='left'>
                <div className='ui  aligned item right'>
                    <div className='ui transparent icon input'>
                        <Dropdown icon='help' className="upward" pointing={false}>
                            <Dropdown.Menu>

                                <Dropdown.Header>Care Center</Dropdown.Header>
                                {supportOptions.map((option) => (
                                    <Dropdown.Item key={option.value} {...option} />
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='results' />
                </div>
            </Menu.Menu>
            <Menu.Menu>
                <div className='ui  aligned item right'>
                    <div className='ui transparent icon input'>
                        <Dropdown icon='user' className="right" pointing={true}>
                            <Dropdown.Menu>
                                
                                <Dropdown.Item>Account ID</Dropdown.Item>
                                <Dropdown.Divider />
                                {profileOptions.map((option) => (
                                    <Dropdown.Item key={option.value} {...option} />
                                ))}
                                <Dropdown.Divider />
                                <Dropdown.Header>Session</Dropdown.Header>
                                {accessOptions.map((option) => (
                                    <Dropdown.Item key={option.value} {...option} />
                                ))}

                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='results' />
                </div>
            </Menu.Menu>
        </Menu>

        <Segment attached='bottom'>
            <img src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
    </div>
)






export default MenuExampleAttached
