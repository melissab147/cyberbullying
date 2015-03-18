var socket = io();

var ViewPost = React.createClass({
    retrieveData: function() {
        socket.emit('data:retrieve')
    },
    getData: function(data) {
        this.setState({data: data});
        console.log(this.state.data[0], "id: ",this.state.data[0].profile_owner_id);
    },
    confirmBullying: function() {
        console.log("Heard click")
        socket.emit('survey:yes');
    },
    denyBullying: function() {
        console.log("Heard click")
        socket.emit('survey:no')
    },
    commentClick: function() {
        console.log("Heard click")
        socket.emit('comments')
    },
    nextClick: function() {
        console.log("Heard click")
        socket.emit('next')
    },    
    getInitialState: function() {
        socket.on('data:send', this.getData)
        return {data: []}
    },
    componentDidMount: function() {
        this.retrieveData();
    },
    render: function() {
        if (this.state.data[0]){
            console.log(this.state.data);

            var result = this.state.data[0];

            return (
                <div>
                    <div className="post row">
                        <div className="image seven columns">
                            <figure>
                                <img key={result.id} src={result.image_url} width="100%"></img>
                                <figcaption key={result.id}>{result.owner_caption}</figcaption>
                            </figure>
                        </div>
                        <div className="info">
                            <p key={result.id}><b>User</b>: {result.profile_owner_id}</p>
                            <p key={result.id}><b>Likes</b>: {result.likes}</p>
                            <p key={result.id}>{result.caption_time}</p>
                            <button key={result.id} onClick={this.commentClick}> Comments </button><br/>
                            <div className="viewComments">
                                <ViewComments ref="viewComments"/>
                            </div>                            
                        </div>
                    </div>
                    <h3> Survey Questions </h3>
                    <div className="survey row">
                        <div className="question eight columns">
                            <p>Is there any cyberaggressive behavior in the online post? Mark yes if there is at least one negative word/comment and/or content with intent to harm someone or others.</p>
                        </div>
                        <div className="answer">
                            <button onClick={this.confirmBullying}>Yes</button>
                            <button onClick={this.denyBullying}>No</button> <br/>
                        </div>
                    </div>
                    <div className="survey row">
                        <div className="question eight columns">
                            <p>Is there any cyerbullying in the online post? Mark yes if there are negative words and/or comment with intent to harm someone or other, and the post includes two or more repeated negativity against a victim that cannot easily defend him or herself.</p>
                        </div>
                        <div className="answer btn-group">
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
