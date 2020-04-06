import React, { Component } from 'react'
import Quote from './Quote.js'
import axios from 'axios';
import uuid from 'uuid/v4'
import './QuoteList.css';

class QuoteList extends Component{
    //Default Props
    static defaultProps = {
        numQuotesToGet: 10
    }

    constructor(props){
        super(props);
        //Get Items from local storage under quotes; if nothing parse the string which is going to turn in an empty array
        this.state = { 
            //Parse takes a JSON string and turns into a JS object
            quotes: JSON.parse(window.localStorage.getItem("quotes") || "[]" ),
            loading: false

        }
        this.seenQuotes = new Set(this.state.quotes.map(j => j.text)) //grab the string from the quotes
        this.handleClick = this.handleClick.bind(this);
    }

    //Mounting
    componentDidMount(){
        if (this.state.quotes.length === 0)
            //If empty, call getQuotes - dont want to override existing quotes
            this.getQuotes();
    }

    //Methods
    async getQuotes(){
        try{
        //Load Quotes
        let quotes = []; //start with empty array that's going to be filled up
        //While Quotes array is < 10, grab 10 dad quotes and push into the quotes array
        while(quotes.length < this.props.numQuotesToGet){
            let res = await axios.get('https://api.kanye.rest');
            
        let newQuote = res.data.quote;
        //If seenQuotes does not have the new Quote, push it in
        if(!this.seenQuotes.has(newQuote)) {
            quotes.push({ id: uuid(), text: newQuote, votes: 0}) //Need to make these an object
        }
        else {
            console.log('Found a Duplicate')        
        }
    }
        this.setState(st => ({
            loading: false,
            //Setstate to exsiting quotes and then all the new quotes coming in
            quotes: [...st.quotes, ...quotes]
        }),
        //Local Storage - Stringify takes JS object and turns it into a JSON string
        () => window.localStorage.setItem("quotes", JSON.stringify(this.state.quotes))
        );
        } catch(e){
            alert(e);
            this.setState({loading: false})
        }
    }
    
    handleClick(){
        //Set State for loading to be true
        this.setState({loading: true}, this.getQuotes) //run getquotes after loading is set to true
    }
    
    handleVote(id, delta){
        this.setState(
            st => ({
                //Map over existing quotes and check is that id === to the id that we're looking for; if it is make a new object
                    //containing the old information but we update the votes
                    //Otherwise not the correct one we just add the existing quote to the array
                quotes: st.quotes.map(j =>
                    j.id === id ? {...j, votes: j.votes + delta} : j)
            }), 
            //Second Arguement to keep quotes
            () => window.localStorage.setItem("quotes", JSON.stringify
            (this.state.quotes))
        )
    }

    render(){
        //Loading Animation - For When Fetch Quote button is clicked
        if(this.state.loading) {
            return (
                <div className='QuoteList-spinner'>
                    <i className="far fa-8x fa-laugh fa-spin" />
                    <h1 className="quoteList-title">
                        Loading...
                    </h1>
                </div>
            )
        }
        {/* Sort based off number of votes, and then render - Want highest votes at the top */}
        let quotes = this.state.quotes.sort((a,b) => b.votes - a.votes)
        return (
            <div className="QuoteList">
                <div className="QuoteList-sidebar">
                    <h1 className="QuoteList-title"><span>Kanye</span> Says</h1>
                    <img src="https://www.iconspng.com/uploads/kanye-west-angry.png" alt=""/>
                    <button className="QuoteList-getmore" onClick={this.handleClick}>Preach Ye!</button>
                </div>
                
                <div className="QuoteList-quotes">
                    {/* Put each quote in a div */}
                    {quotes.map( j => (
                        <Quote
                        key={j.id} 
                        votes={j.votes} 
                        text={j.text} 
                        upvote={() => this.handleVote(j.id, 1)}
                        downvote={() => this.handleVote(j.id, -1)} />
                    ))}
                </div>
            </div>
        )
    }
}

export default QuoteList;