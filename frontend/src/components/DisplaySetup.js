import React from 'react'

export default function Navbar() {
    return (
        <div>
            <div className="ui menu">
                <a href="/display_objects" className="item">Display Objects</a>
                {/*<a href="create_objects" className="item">Create Objects</a>*/}
                {/*<a href="create_fields" className="item">Create Fields</a>*/}
                <a href="/load_form" className="item">Form</a>
                <a href="/display_values" className="item">View Values</a>
            </div>
        </div>)
}
