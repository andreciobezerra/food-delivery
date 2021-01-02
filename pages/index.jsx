import { useState } from "react"
import { Col, Container, Input, InputGroup, InputGroupAddon, Row } from "reactstrap"
import RestaurantList from "../components/RestaurantList"
import styles from "../styles/index.module.css"

const Index = () => {
  const [query, updateQuery] = useState("")

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className={styles.search}>
            <InputGroup>
              <InputGroupAddon addonType="append"> Search </InputGroupAddon>
              <Input
                className={styles.searchInput}
                onChange={e => updateQuery(e.target.value.toLocaleLowerCase())}
                value={query}
              />
            </InputGroup>
          </div>
          <RestaurantList search={query} />
        </Col>
      </Row>
    </Container>
  )
}

export default Index