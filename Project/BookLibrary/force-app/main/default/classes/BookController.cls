public with sharing class BookController {

    public BookController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Book__c> getBookList(String searchKey){
        String key = '%' + searchKey + '%';
        List<Book__c> bookList = [
            SELECT Id, Google_Book_Id__c, Goodreads_Book_Id__c, 
            Name, Authors__c, ISBN_10__c, ISBN_13__c, Image_Link__c, 
            Average_Rating__c, Publisher__c, Page_Count__c, 
            Year_Published__c, Published_Date__c
            FROM Book__c WHERE Name LIKE :key
        ];
        return bookList;
    }

    @AuraEnabled(cacheable=true)
    public static void getGoogleBooks(String searchKey){
        String str = EncodingUtil.urlEncode(searchKey, 'UTF-8');
        String str2 = 'https://www.googleapis.com/books/v1/volumes?q=' + 'str';
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(str2);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            // Deserialize the JSON string into collections of primitive data types.
            System.debug(response.getBody());
        }
    }
    
}
