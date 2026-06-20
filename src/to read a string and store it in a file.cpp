#include<fstream.h>
#include<string.h>
void main()
{
    char string[80];
    cout<<"enter a string\n";
    cin>>string;
    int len=strlen(string);
    fstream file;
    file.open("TEXT",ios::in |ios::out);
    for(int i=0;i<len;i++)
    file.put(string[i]); //go to start
char ch;
while(file)
{
    file.get(ch); //get character from file
    cout<<ch; //display it on screen
   }

}