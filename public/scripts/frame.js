var socket = io();

var MainFrame = React.createClass({
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
    getInitialState: function() {
        socket.on('data:send', this.getData)
        return {data: []}
    },
    componentDidMount: function() {
        this.retrieveData();
    },
    render: function() {
        if (this.state.data[0]){
            console.log(this.state.data)

            var results = this.state.data;

            // for (i = 0; i < 88; i++){
            //     rows.push(<img src={this.state.data[i].image_url} align="left"></img>)
            //     rows.push(<b>Owner:</b>)
            //     rows.push({this.state.data[i].profile_owner_id})
            //     rows.push(<b>Owner caption:</b> {this.state.data[i].owner_caption} )
            //     rows.push(<b>Likes:</b> {this.state.data[i].likes})
            // }
            return (
                <div>
                    <button onClick={this.confirmBullying}>Yes</button>
                    <button onClick={this.denyBullying}>No</button> <br/>
                    <ol>
                        {results.map(function(result) {
                            return(
                                <div>
                                    <li key={result.id}><b>{result.profile_owner_id}</b>: {result.owner_caption}</li>
                                    <img key={result.id} src={result.image_url} width="200"></img>
                                    <p key={result.id}><b>Likes</b>: {result.likes}</p>
                                    <p key={result.id}><b>Posted on</b>: {result.caption_time}</p>

                                </div>
                            );
                        })}
                    </ol>
                </div>

            )
        }
        else{
            return (
                <h2>No data</h2>
            )
        }
    }
});

React.render(
    <MainFrame />,
    document.getElementById('content')
)
