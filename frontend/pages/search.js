import client from '../src/apollo/client';
import { handleRedirectsAndReturnData } from '../src/utils/slug';
import { GET_MENUS } from '../src/queries/get-menus';
import Header from '../src/components/layout/header';
import Link from 'next/link';
import Footer from '../src/components/layout/footer';
import SearchBox from '../src/components/search/search-box';

export default function Search( {data} ) {
  const {header, footer, headerMenus, footerMenus} = data || {};
  return (
    <>
      <Header header={header} headerMenus={headerMenus?.edges ?? []}/>
      <div className="h-almost-screen">
        <SearchBox/>
      </div>
      <Footer footer={footer} footerMenus={footerMenus?.edges ?? []}/>
    </>
  );
}

export async function getStaticProps( context ) {

  const { data, errors } = await client.query( {
    query: GET_MENUS,
  } );

  const defaultProps = {
    props: {
      data: data || {}
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
