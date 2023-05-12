import { Text, Spacer, Grid, Col, Button, Link } from "@nextui-org/react"
import { Box } from "./Box";


export const Content = () => (
<Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
  <Grid.Container 
        justify='center'
        css={
          {
            "height": "500px", 
            "backgroundImage": "url(https://littlevisuals.co/images/sunset.jpg)"
          } }>
            
              <Grid 
                alignItems="center"
                // xs={12} 
                sm={12} 
                 >
                  <Col
                    css={{
                      "width": "100%"
                    }} >
                      <Text 
                        weight={"bold"} 
                        size={70} 
                        css={{"textAlign": "left"}} >
                          Langua Exchange
                      </Text>
                      <Text size={40}>
                          Healthy habits for your brain
                      </Text>
                      <Link href="http://localhost:3000/article/experience-the-magic-of-language-exchange-with-millen-k">
                        <Button 
                          size="md"
                          shadow color="gradient"
                          css={{
                            "width": "100%",
                            "marginTop": "100px"}}>
                              Play the video
                            
                        </Button>
                      </Link>
                     
                  </Col>
              </Grid>
  </Grid.Container>
  <Text h2>Lingoverse</Text>
  <Text h3>
  The Game Changer
  </Text>
  <Spacer y={1} />
  <Text size="$lg">
    Welcome to this unique collections of free resources to make the inmertion in a foraigth language remotely 🤭
  </Text>
  <Spacer y={1} />
</Box>
);
