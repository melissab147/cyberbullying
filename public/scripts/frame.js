var socket = io();

var MainFrame = React.createClass({

    confirmBullying: function() {
        console.log("Heard click")
        socket.emit('survey:yes');
    },
    denyBullying: function() {
        console.log("Heard click")
        socket.emit('survey:no')
    },
    render: function() {
        return (
            <div>
                <button onClick={this.confirmBullying}>Yes</button>
                <button onClick={this.denyBullying}>No</button>
                <img src={this.state.post.image_url}></img> <br/> 
                {this.state.post.profile_owner_id}
                <b>Likes:</b> {this.state.post.likes} <br/> 
                <b>Caption:</b> {this.state.post.owner_caption} <br/> 
            </div>            
        )
    }
});

React.render(
    // <MainFrame url='http://localhost:3000/sources'  />,    
    <MainFrame url='data/cyberbully.json.data'  />,
    document.getElementById('content')
)
