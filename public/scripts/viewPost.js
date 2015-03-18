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
    handleClick: function(event) {
        console.log("Heard click")
        socket.emit('comments')
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
                        <div className="image five columns">
                            <img key={result.id} src={result.image_url} width="250"></img>
                        </div>
                        <div className="info">
                            <p key={result.id}><b>{result.profile_owner_id}</b>: {result.owner_caption}</p>
                            <p key={result.id}><b>Likes</b>: {result.likes}</p>
                            <p key={result.id}>{result.caption_time}</p>
                            <button key={result.id} onClick={this.handleClick}> Comments </button><br/>
                        </div>
                    </div>

                    <div className="survey row">
                        <h3> Survey Questions </h3>
                        <p>Is there any cyberaggressive behavior in the online post? Mark yes if there is at least one negative word/comment and/or content with intent to harm someone or others.</p>
                        <button onClick={this.confirmBullying}>Yes</button>
                        <button onClick={this.denyBullying}>No</button> <br/>
                        <p>Is there any cyerbullying in the online post? Mark yes if there are negative words and/or comment with intent to harm someone or other, and the post includes two or more repeated negativity against a victim that cannot easily defend him or herself.</p>
                        <button onClick={this.confirmBullying}>Yes</button>
                        <button onClick={this.denyBullying}>No</button> <br/>                        
                    </div>
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

{/*React.render(
    <ViewPost />,
    document.getElementById('content')
)*/}
