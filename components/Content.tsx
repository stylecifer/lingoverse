//components/Content.tsx
//this component is the main content of the page
//But I mant to display the main feed of the articles here
import articles from "@/pages/api/data";
import { Text, Spacer, Grid, Col, Button, Card } from "@nextui-org/react"
import Link from 'next/link';  // import Link from next/link
import { Box } from "./Box";


export const Content = () => (
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

  
  <Box style={{maxWidth: "800px",  margin: "auto", }}><Text size="$xl">
  Alright, everybody, picture this up! I was on cloud nine, chatting away in my target language with awesome people from the seven seas. During the pandemic, life was a linguistic rollercoaster until Duolingo went and pulled the plug on their events website. <br/><Spacer y={0.7} />
  I didn't let that friendship fade away. Nah-uh. The connections I made with attendees and hosts felt as real as it gets. But I lost those little details, those addictive game-like elements that made language learning an endless joyride. Now, I'm on a social media scavenger hunt to find those moments again.<br/><Spacer y={0.7} />
  As a UX designer extraordinaire, I thought, “I'm going to take matters into my own hands!" So, I embarked on a coding adventure, learning the ropes, and bringing my fellow language lovers a place where we can relive that epic, laugh-out-loud journey of learning a new language.<br/><Spacer y={0.7} />
  You heard it right, me hearties, it's time to jump into the crew and <b>go for the treasure!</b></Text></Box>
  <Spacer y={1} />
</Box>
);
