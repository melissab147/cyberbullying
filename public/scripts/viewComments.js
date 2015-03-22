var socket = io();

var ViewComments = React.createClass({
    parseComments: function() {   
        var doc = this.state.data;   
        var idx;
        var numComments = 150;
        var comments = [];
        for(idx = 1; idx < numComments; idx++) {
            var user = "user_id_"+idx;
            var content = "comment_"+idx;
            var creation_time = "creation_time_"+idx;
            if(doc[user] == " " || doc[user] == "") break;
            var comment = {};
            comment.user = doc[user];
            comment.content = doc[content];
            comment.creation_time = doc[creation_time];
            comments.push(comment);
        }
        
        this.setState({comments: comments});
    },
    retrieveData: function() {
        socket.emit('data:retrieve');
    },
    getData: function(data) {
        this.setState({data: data});
        this.parseComments();
    },
    getInitialState: function() {
        socket.on('data:send', this.getData);
        return {data: [], comments: []};
    },
    componentDidMount: function() {
        this.retrieveData();
    },
    render: function() {
        if (this.state.data){
            var comments = this.state.comments.map(function(comment) {
                return (
                    <div>
                        <p><b>{comment.user}</b>: {comment.content}<br />
                        <span className="posted">{comment.creation_time}</span></p>
                    </div>
                )
            });
            return (
                <div className="comments">
                    {comments}
                </div>
            )


            /*
            return (
                <div className="comments">
                    <h6> To do... comments go here </h6>
                    <p><b>User</b>: comment (post time)</p>
                    <p><b>User</b>: comment (post time)</p>
                    <p><b>User</b>: comment (post time)</p>
                    <p><b>User</b>: comment (post time)</p>
                    <p><b>User</b>: comment (post time)</p>
                    <p><b>User</b>: comment (post time)</p>
                    <p><b>User</b>: comment (post time)</p>
                    <p><b>User</b>: comment (post time)</p>
                    <p><b>User</b>: comment (post time)</p>
                    <p><b>User</b>: comment (post time)</p>
                    <p><b>User</b>: comment (post time)</p>
                    <p><b>User</b>: comment (post time)</p>
                    <p><b>User</b>: comment (post time)</p>
                    <p><b>User</b>: comment (post time)</p>
                    
                </div>

            )
               */
        }
        else{
            return (
                <h2>No data</h2>
            );
        }
    }
});

