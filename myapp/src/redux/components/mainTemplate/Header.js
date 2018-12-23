import React, { Component } from 'react';


export default class Header extends Component {
  render() {
    const {project} = this.props;
    return (
        <div className="header">
            <div className="header_text">
                <h1 className="project_name">{project.name}</h1>
                <p>{project.motto}</p>
            </div>
            <div class="header_img">
                <img height="60" src={project.logo} alt={project.name}/>
            </div>
        </div>
    );
  }
}
