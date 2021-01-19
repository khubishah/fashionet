import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
    state = {
        loading: true,
    };

    unsubscribeFromSnapshot = null;
    // fashionet-b17ce
    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });
        // fetch('https://firestore.googleapis.com/v1/projects/fashionet-b17ce/databases/(default)/documents/collections'
        // )
        //     .then(response => response.json())
        //     .then(collections => console.log(collections));
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     this.setState({ loading: false });

        //     console.log(collectionsMap);
        // });
    }
    

    

    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />}></Route>
                <Route path={`${match.path}/:collectionId`} render={props => (
                    <CollectionPageWithSpinner isLoading={loading} {...props} />
                )}></Route>
            </div>
        );
    }

}
    
const mapDispatchToProps = (dispatch) => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

    

export default connect(null, mapDispatchToProps)(ShopPage);