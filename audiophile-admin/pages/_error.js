import Page404 from "@/components/Page404"

function Error({ statusCode }) {
    return (
        <Page404/>
    )
  }
   
  Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }
   
  export default Error