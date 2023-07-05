import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <>
            {currentUser && <Header currentUser={currentUser} />}
            <Component { ...pageProps } />
        </>
    )
};

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    
    const { data } = await client.get('/api/users/currentuser');

    let pageProps = {} ;
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    console.log("APPCOMPONENT PROPS")
    console.log(pageProps)
    console.log(data)

    return {
        pageProps,
        ...data
    };
  };
  
  export default AppComponent;