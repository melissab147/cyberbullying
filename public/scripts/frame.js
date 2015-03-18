var socket = io();

var MainFrame = React.createClass({
<<<<<<< HEAD
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

=======
    retrieveData: function() {
        socket.emit('data:retrieve')
    },
    getData: function(data) {
        this.setState({data: data});
        console.log(this.state.data);
    },
>>>>>>> e57b02fbdc143739c09ea549531e24d8ccc394d2
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
    <MainFrame />,
    document.getElementById('content')
)
