var socket = io();

var ViewPost = React.createClass({
    retrieveData: function() {
        socket.emit('data:retrieve')
    },
    getData: function(data) {
        console.log(data)
        this.setState({data: data});
    },
    confirmAggression: function() {
        console.log("Heard click")
        this.setState({aggression: true})
    },
    denyAggression: function() {
        console.log("Heard click")
        this.setState({aggression: false})
    },
    confirmBullying: function() {
        console.log("Heard click")
        this.setState({bullying: true})
    },
    denyBullying: function() {
        console.log("Heard click")
        this.setState({survey: false})
    },
    commentClick: function() {
        console.log("Heard click")
        socket.emit('comments')
    },
    nextClick: function() {
        if(this.state.aggression === null || this.state.bullying === null) {
            alert("Please answer the survey before proceeding.");
            return; 
        }
        var results = {aggression: this.state.aggression, bullying: this.state.bullying}
        socket.emit('survey:next', results)
    },    
    getInitialState: function() {
        socket.on('data:send', this.getData)
        return {data: [], bullying: null, aggression: null }
    },
    componentDidMount: function() {
        this.retrieveData();
    },
    render: function() {
        if (this.state.data){

            var result = this.state.data;

            return (
                <div>
                    <div className="post row">
                        <div className="image seven columns">
                            <figure>
                                <img key={result.id} src={result.image_url} width="100%"></img>
                                <figcaption key={result.id}>&ldquo;{result.owner_caption}&rdquo;</figcaption>
                            </figure>
                        </div>
                        <div className="info">
                            <p key={result.id}><b>User</b>: {result.profile_owner_id}</p>
                            <p key={result.id}><b>Likes</b>: {result.likes}</p>
                            <p key={result.id}>{result.caption_time}</p>
                            <p key={result.id}><b>Comments</b>:</p>
                            {/*<button key={result.id} onClick={this.commentClick}> Comments </button><br/>*/}
                            <div className="viewComments">
                                <ViewComments />
                            </div>                            
                        </div>
                    </div>
                    <h3> Survey Questions </h3>
                    <div className="survey row">
                        <div className="question eight columns">
                            <p>Is there any cyberaggressive behavior in the online post? Mark yes if there is at least one negative word/comment and/or content with intent to harm someone or others.</p>
                        </div>
                        <div className="answer">
                            <br />
                            <button onClick={this.confirmAggression}>Yes</button>
                            <button onClick={this.denyAggression}>No</button> <br/>
                        </div>
                    </div>
                    <div className="survey row">
                        <div className="question eight columns">
                            <p>Is there any cyerbullying in the online post? Mark yes if there are negative words and/or comment with intent to harm someone or other, and the post includes two or more repeated negativity against a victim that cannot easily defend him or herself.</p>
                        </div>
                        <div className="answer btn-group">
                            <br />
                            <button onClick={this.confirmBullying}>Yes</button>
                            <button onClick={this.denyBullying}>No</button> <br/>
                        </div>
                    </div>
                    <button onClick={this.nextClick} className="nextButton">Next Post</button> <br/>
                </div>

            )
        }
        else{
            return (
                <h2>No data</h2>
            );
        }
    }
});
