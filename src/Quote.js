import React, { Component } from 'react'
import './Quote.css'

class Quote extends Component{

    //Change the Color of Vote Border based on number of upvotes
    getColor(){
        if (this.props.votes >= 15){
            return "#4CAF50";
        } else if (this.props.votes >= 12) {
            return "#8BC34A";
        } else if (this.props.votes >= 9) {
            return "#CDDC39";
        } else if (this.props.votes >= 6) {
            return "#FFEB3B";
        } else if (this.props.votes >= 3) {
            return "#FFC107";
        } else if (this.props.votes >= 0) {
            return "#FF9800";
        } else {
            return "#F44336"
        }
    }

    //Change the Ye-Emoji Icon based on number of upvotes
    getEmoji(){
        if (this.props.votes >= 15){
            return `/imgs/kanye-laughing.png`;
        } else if (this.props.votes >= 12) {
            return `/imgs/kanye-smiling.png`;
        } else if (this.props.votes >= 9) {
            return `/imgs/kanye-smirk.png`;
        } else if (this.props.votes >= 6) {
            return `/imgs/kanye-shocked.png`;
        } else if (this.props.votes >= 3) {
            return `/imgs/kanye-neutral.png`;
        } else if (this.props.votes >= 0) {
            return `/imgs/kanye-sad.png`;
        } else {
            return `/imgs/kanye-mad.png`;
        }
    }



    render(){
        return(
            <div className="Quote">
                <div className="Quote-buttons">
                    <i className="fas fa-arrow-up" onClick={this.props.upvote} />
                    <span className="Quote-votes" style={{borderColor: this.getColor()}}>{this.props.votes}</span>
                    <i className="fas fa-arrow-down" onClick={this.props.downvote}/>
                </div>

                <div className="Quote-text">
                    {this.props.text}
                </div>

                <div className="Quote-smiley">
                    <img src={this.getEmoji()} />
                </div>
            </div>
        )
    }
}

export default Quote;
