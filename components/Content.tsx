//components/Content.tsx
//this component is the main content of the page
//But I mant to display the main feed of the articles here
import articles from "@/pages/api/data";
import { Text, Spacer, Grid, Col, Button, Card } from "@nextui-org/react"
import Link from 'next/link';  // import Link from next/link
import { Box } from "./Box";
import copys from "@/lib/copys";


export const Content = () => {
  const { lingoverse } = copys[0]; // Assuming there is only one element in the `copys` array
return (
<Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
  <Grid.Container gap={2} justify="center">
    {articles.map((article, index) => (
      <Grid xs={12} sm={4} key={index}> 
        <Link href={`/article/${article.slug}`} passHref>
          <Card isPressable>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
              <Col>
                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                  What to watch
                </Text>
                <Text h4 color="white">
                  {article.title}
                </Text>
              </Col>
            </Card.Header>
            <Card.Image
              src={article.coverImage}
              objectFit="cover"
              width="100%"
              height={340}
              alt="Card image background"
            />
          </Card>
        </Link>
      </Grid>
    ))}
  </Grid.Container>
  <Spacer y={1} />
<Text h2 
      size={60}
      css={{
        textGradient: "45deg, $purple600 -20%, $pink600 100%",
        textAlign: "center"
      }}
      weight="bold"
    >Lingoverse </Text>
    <Text weight="bold" size={48} 
          css={{textGradient: "45deg, $pink600 -20%, $blue600 100%", textAlign: "center", marginTop:"-40px",        
    }}>The Game Changer</Text>

<Spacer y={1} />


<Box style={{maxWidth: "800px",  margin: "auto", }}>
<Text size="$xl" dangerouslySetInnerHTML={{ __html: lingoverse }} />
</Box>
<Spacer y={1} />
</Box>)
};
