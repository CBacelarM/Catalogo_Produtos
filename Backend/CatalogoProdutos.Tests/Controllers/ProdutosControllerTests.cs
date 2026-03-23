using Xunit;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;

namespace CatalogoProdutos.Tests.Controllers;

public class ProdutosControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public ProdutosControllerTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetProdutos_DeveRetornarOk()
    {
        var response = await _client.GetAsync("/produtos");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}