import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { loadPosts, loadPostsLocalSetup } from './actions';

const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

class MediumPosts extends Component {
    constructor(props) {
        super(props);
        props.loadPosts();
        props.loadPostsLocalSetup();
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        {this.props.posts.references ? map(this.props.posts.references.Post, post => {
                            return (
                                <div key={post.id} className="post-preview">
                                    <a target='_blank' rel="noopener noreferrer" href={`https://medium.com/@avanthikameenakshi/${post.uniqueSlug}`}>
                                        <h2 className="post-title">
                                            {post.title}
                                        </h2>
                                        <h3 className="post-subtitle">
                                            {post.previewContent.bodyModel.paragraphs[post.previewContent.bodyModel.paragraphs.length - 1].text}
                                        </h3>
                                    </a>
                                    <p className="post-meta">Posted by <a target='_blank' rel="noopener noreferrer" href="https://medium.com/@avanthikameenakshi">Avanthika Meenakshi</a> on {monthsArray[new Date(post.createdAt).getMonth()]} {new Date(post.createdAt).getDate()}, {new Date(post.createdAt).getFullYear()}</p>
                                </div>
                            );
                        }) : null}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.mediumPosts.posts
});

const mapDispatchToProps = dispatch => ({
    loadPosts: () => dispatch(loadPosts()),
    loadPostsLocalSetup: () => dispatch(loadPostsLocalSetup())
});

export default connect(mapStateToProps, mapDispatchToProps)(MediumPosts);