var socket = io();

var ViewComments = React.createClass({
    retrieveData: function() {
        socket.emit('data:retrieve')
    },
    getData: function(data) {
        this.setState({data: data});
        console.log(this.state.data[0], "id: ",this.state.data[0].profile_owner_id);
    },
    getInitialState: function() {
        socket.on('data:send', this.getData)
        return {data: []}
    },
    componentDidMount: function() {
        this.retrieveData();
    },
    render: function() {
        if (this.state.data){
            console.log(this.state.data);

            var result = this.state.data[0];

            return (
                <div className="comments">
                    <h6> To do... comments go here </h6>
                    <p><b>User</b>: comment (post time)</p>
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

React.render(
    <MainFrame />,
    document.getElementById('content')
)
