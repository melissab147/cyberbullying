var socket = io();

var MainFrame = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
  
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({
                    data: data
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

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
                // <img src={this.state.post.image_url}></img> <br/> 
                {this.state.profile_owner_id}
                // <b>Likes:</b> {this.state.post.likes} <br/> 
                // <b>Caption:</b> {this.state.post.owner_caption} <br/> 
            </div>            
        )
    }
});

React.render(
    // <MainFrame url='http://localhost:3000/sources'  />,    
    <MainFrame url='data/cyberbully.json.data'  />,
    document.getElementById('content')
)
