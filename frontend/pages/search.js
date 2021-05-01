import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {isEmpty} from 'lodash';

import client from '../src/apollo/client';
import { handleRedirectsAndReturnData } from '../src/utils/slug';
import { GET_MENUS } from '../src/queries/get-menus';
import Header from '../src/components/layout/header';
import Footer from '../src/components/layout/footer';
import SearchBox from '../src/components/search/search-box';
import LoadMorePosts from '../src/components/news/load-more-posts';
import { GET_SEARCH_RESULTS } from '../src/queries/search/get-search-results';
import ErrorMessage from '../src/components/error';
import Loading from '../src/components/loading';

export default function Search( { data } ) {
  const { header, footer, headerMenus, footerMenus } = data || {};
  const [ searchQuery, setSearchQuery ] = useState( '' );
  const [ searchError, setSearchError ] = useState( '' );
  const [ queryResultPosts, setQueryResultPosts  ] = useState( {} );
  const graphQLQuery = GET_SEARCH_RESULTS;

  const [ fetchPosts, { loading } ] = useLazyQuery( graphQLQuery, {
    notifyOnNetworkStatusChange: true,
    onCompleted: ( data ) => {
      setQueryResultPosts( data?.posts ?? {} );
    },
    onError: ( error ) => {
      setSearchError( error?.graphQLErrors ?? '' );
    }
  } );

  const handleSearchButtonClick = () => {

    if ( isEmpty( searchQuery ) ) {
      setSearchError( 'Please enter text to search' );
      setQueryResultPosts( [] );
      return null;
    }

    setSearchError( '' );

    fetchPosts( {
      variables: {
        first: 10,
        after: null,
        query: searchQuery
      }
    } );
  };

  return (
    <>
      <Header header={ header } headerMenus={ headerMenus?.edges ?? [] }/>
      <div className="mx-auto min-h-almost-screen">
        <SearchBox searchQuery={ searchQuery } setSearchQuery={ setSearchQuery } handleSearchButtonClick={handleSearchButtonClick}/>
        <ErrorMessage text={searchError} classes="max-w-xl mx-auto mt-4"/>
        <Loading showSpinner visible={loading}/>
        <LoadMorePosts
          posts={queryResultPosts}
          graphQLQuery={graphQLQuery}
          searchQuery={searchQuery}
          classes="md:container px-5 py-24 mx-auto min-h-almost-screen"
        />
      </div>
      <Footer footer={ footer } footerMenus={ footerMenus?.edges ?? [] }/>
    </>
  );
}

export async function getStaticProps() {

  const { data, errors } = await client.query( {
    query: GET_MENUS,
  } );

  const defaultProps = {
    props: {
      data: data || {},
    },
    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 1,
  };

  // return defaultProps;

  return handleRedirectsAndReturnData( defaultProps, data, errors, 'headerMenus' );
}
