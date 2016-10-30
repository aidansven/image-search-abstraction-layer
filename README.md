Goals!

I believe that it is good practice to use the path /api mainly to emphasize that this is purely an api request.
I will use the "bing" search API.. or Google Custom Search API... haven't actually decided yet.


=============
/api/search/:path?offset=0
=============
GOAL 1: (x)
Make a friendly looking page where someone can put in a search query and be redirected to the URL Encoded api path

GOAL 2:
If someone connects to this path (URL encoded!), they will be served a response in JSON format.
The JSON response will include:
{img:"imggggg", alt:"altttttt", url:"urlllll"}

GOAL 3:
Store the Search Query that made a get request in a collection. Include
{search: "searchhhhh", time: "timestamppppp"}

GOAL 4:
Get the "Offset" query working!

GOAL 5:
Be done with this mind-melting project! :)