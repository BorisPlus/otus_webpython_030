import React, { Component } from 'react';


export default class Navigation extends Component {
  render() {
    return (
        <div class="navigation">
            <ul>
                <li><a href="./index.html" class="checked">Блог</a></li>
                <li><a href="./">Инструменты</a></li>
                <li><a href="./">О проекте</a></li>
                <li><a href="./">Общение</a></li>
                <li style={{float:'right'}}><a class="active" href="./">Личный кабинет</a></li>
            </ul>
        </div>
    );
  }
}
