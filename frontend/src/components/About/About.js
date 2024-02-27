import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <div><h2>About Page</h2>
                <ul className="list-group">
                    <li>This project uses MERN - MongoDB, Express, React and Node - stack to implement a coffee shop.<br />
                    It offers the following functionlaity:</li>
                    <ul>
                        <li>User Register - Check the new username or email address if it’s already registered to the system using AJAX</li>
                        <li>Form validation: Check if all mandatory fields are filled out. (JQuery)</li>
                        <li>Form validation: Password need to be more than 6 character and need to have alphanumeric and special characters. (JQuery)</li>
                    </ul>
                </ul>
                <ul className="list-group">
                    <li>Lists the available cofee products in the system</li>
                    <ul>
                        <li>The user can search on the basis of category and item name.</li>
                        <li>Search and Filtering are integrated togehter.</li>
                    </ul>
                </ul>
                <ul className="list-group">
                    <li>Paging functionlaity is provided for listing the products.</li>
                    <ul>
                        <li>Paging is provided with Search and filtering as well.</li>
                    </ul>
                </ul>
                <ul className="list-group">
                    <li>Users can add items to the cart.</li>
                    <ul>
                        <li>Users can add / subtract the items in the cart until the order is placed.</li>
                        <li>Users can place orders by clicking on Checkout button.</li>
                        <li>Payment platforms are not included.</li>
                    </ul>
                </ul>
                <ul className="list-group">
                    <li>Users can view their individual orders.</li>
                </ul>
                <ul className="list-group">
                    <li>Admin users have the same interface as Normal users.</li>
                    <ul>
                        <li>Admin users can Add, Delete or Update a Item.</li>
                        <li>Add and Update feature are supported with form validation.</li>
                        <li>Images can be added or Updated by using URLs. This way we just store the URL and can use another server for image storage.</li>
                    </ul>
                </ul>
                <ul className="list-group">
                    <li>Admin user can do 2 type of delte</li>
                    <ul>
                        <li>Hard Delete - Permanently remove item from database.</li>
                        <li>Soft Delete - Remove the item from showing in listing and search.</li>
                        <li>Soft Delete - Can be accessed by checking the check box in UpdateItem.</li>
                    </ul>
                </ul>
                <ul className="list-group">
                    <li>Website Content is taken from https://www.webstaurantstore.com/article/397/types-of-coffee-drinks.html</li>
                </ul>
                </div>
            </div>
        );
    }
}

export default About;