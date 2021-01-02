import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { Card, CardBody, CardFooter, CardImg, CardText, CardTitle, Col, Row } from "reactstrap"
import Link from "next/link"
import styles from "../styles/restaurant-list.module.css"

const QUERY = gql`{
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`

const ReastaurantList = (props) => {
  const { data, error, loading } = useQuery(QUERY)
  if (error) { return "Error loading restaurants!" }
  if (loading) { return <h1>Fetching</h1> }

  if (data.restaurants && data.restaurants.length) {
    const searchQuery = data.restaurants.filter((query) => query.name.toLowerCase().includes(props.search))

    return (
      <>
        {
          (searchQuery.length != 0)
            ?
            <Row noGutters>
              {
                searchQuery.map(res => (
                  <Col xl="3" lg="4" sm="6" xs="12" key={res.id}>
                    <Card className={styles.card}>
                      {/*eslint-disable-next-line no-undef */}
                      <CardImg top={true} className={styles.cardImage} src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`} />
                      <CardBody>
                        <CardTitle><strong>{res.name}</strong></CardTitle>
                        <CardText>{res.description}</CardText>
                      </CardBody>
                      <CardFooter className={styles.cardFooter}>
                        <Link as={`/restaurants/${res.id}`} href={`/restaurants?id=${res.id}`}                      >
                          <a className="btn btn-primary">View</a>
                        </Link>
                      </CardFooter>
                    </Card>
                  </Col>
                ))
              }
            </Row>
            : <h1>No Restaurants Found</h1>
        }
      </>
    )
  }

  return <h5>Add Restaurants.</h5>
}

export default ReastaurantList