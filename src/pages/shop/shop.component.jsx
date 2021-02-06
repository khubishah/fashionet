import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import { Route } from 'react-router-dom';
import CollectionPageContainer from '../collection/collection.container';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
class ShopPage extends React.Component {

    componentDidMount() {
        const { fetchCollectionsStart } = this.props;
        fetchCollectionsStart();
    }
    

    

    render() {
        const { match,} = this.props;
        return (
            <div className='shop-page'>
                <Route 
                    exact 
                    path={`${match.path}`} 
                    component={CollectionsOverviewContainer}
                    //render={(props) => 
                   //     <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} 
                   // />}>
                   />
                <Route 
                    path={`${match.path}/:collectionId`} 
                //     render={props => (
                //     <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />
                // )}>
                component={CollectionPageContainer}
                />
            </div>
        );
    }

}
// const mapStateToProps = createStructuredSelector({
//     isCollectionLoaded: selectIsCollectionsLoaded
// });

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

    

export default connect(null, mapDispatchToProps)(ShopPage);