import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

void main() => runApp(EstoqueApp());

class EstoqueApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SiStock',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: Colors.brown[700],
        colorScheme:
            ColorScheme.fromSwatch(primarySwatch: Colors.brown).copyWith(
          secondary: Colors.deepOrangeAccent.shade200,
        ),
        scaffoldBackgroundColor: Colors.brown[50],
        textTheme: TextTheme(
          titleLarge: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.brown[900]),
          titleMedium: TextStyle(fontSize: 16, color: Colors.brown[700]),
        ),
        floatingActionButtonTheme: FloatingActionButtonThemeData(
          backgroundColor: Colors.deepOrangeAccent.shade200,
        ),
      ),
      home: ListaProdutosPage(),
    );
  }
}

class Produto {
  String nome;
  int quantidade;
  String descricao;
  DateTime dataEntrada;

  Produto({
    required this.nome,
    required this.quantidade,
    required this.descricao,
    required this.dataEntrada,
  });
}

class ListaProdutosPage extends StatefulWidget {
  @override
  _ListaProdutosPageState createState() => _ListaProdutosPageState();
}

class _ListaProdutosPageState extends State<ListaProdutosPage> {
  final List<Produto> _produtos = [];
  List<Produto> _produtosFiltrados = [];
  final TextEditingController _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _produtosFiltrados = _produtos;
    _searchController.addListener(_filtrarProdutos);
  }

  void _filtrarProdutos() {
    final query = _searchController.text.toLowerCase();
    setState(() {
      _produtosFiltrados = query.isEmpty
          ? _produtos
          : _produtos
              .where((p) => p.nome.toLowerCase().contains(query))
              .toList();
    });
  }

  void _adicionarProduto() async {
    final Produto? novo = await Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => AdicionarProdutoPage()),
    );
    if (novo != null) {
      setState(() {
        _produtos.add(novo);
        _filtrarProdutos();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('SiStock'),
        bottom: PreferredSize(
          preferredSize: Size.fromHeight(56),
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Buscar produtos...',
                prefixIcon: Icon(Icons.search),
                filled: true,
                fillColor: Colors.brown[100],
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30),
                    borderSide: BorderSide.none),
              ),
            ),
          ),
        ),
      ),
      body: _produtosFiltrados.isEmpty
          ? Center(child: Text('Nenhum produto encontrado'))
          : ListView.builder(
              padding: EdgeInsets.all(12),
              itemCount: _produtosFiltrados.length,
              itemBuilder: (_, i) {
                final produto = _produtosFiltrados[i];
                return Card(
                  child: ListTile(
                    title: Text(produto.nome,
                        style: TextStyle(fontWeight: FontWeight.bold)),
                    trailing: Icon(Icons.chevron_right),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => DetalhesProdutoPage(
                            produto: produto,
                            onEditar: (editado) {
                              setState(() {
                                final index = _produtos.indexOf(produto);
                                _produtos[index] = editado;
                                _filtrarProdutos();
                              });
                            },
                            onRemover: () {
                              setState(() {
                                _produtos.remove(produto);
                                _filtrarProdutos();
                              });
                            },
                          ),
                        ),
                      );
                    },
                  ),
                );
              },
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: _adicionarProduto,
        child: Icon(Icons.add),
      ),
    );
  }
}

class AdicionarProdutoPage extends StatefulWidget {
  @override
  _AdicionarProdutoPageState createState() => _AdicionarProdutoPageState();
}

class _AdicionarProdutoPageState extends State<AdicionarProdutoPage> {
  final _nomeController = TextEditingController();
  final _quantidadeController = TextEditingController();
  final _descricaoController = TextEditingController();
  DateTime _dataEntrada = DateTime.now();

  void _selecionarData() async {
    final data = await showDatePicker(
      context: context,
      initialDate: _dataEntrada,
      firstDate: DateTime(2000),
      lastDate: DateTime(2100),
    );
    if (data != null) setState(() => _dataEntrada = data);
  }

  void _salvar() {
    final nome = _nomeController.text.trim();
    final qtd = int.tryParse(_quantidadeController.text);
    final desc = _descricaoController.text.trim();
    if (nome.isEmpty || qtd == null || qtd <= 0) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Preencha corretamente')));
      return;
    }
    final novo = Produto(
      nome: nome,
      quantidade: qtd,
      descricao: desc,
      dataEntrada: _dataEntrada,
    );
    Navigator.pop(context, novo);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Adicionar Produto')),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: ListView(
          children: [
            TextField(
                controller: _nomeController,
                decoration: InputDecoration(labelText: 'Nome')),
            SizedBox(height: 12),
            TextField(
              controller: _quantidadeController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(labelText: 'Quantidade'),
            ),
            SizedBox(height: 12),
            TextField(
              controller: _descricaoController,
              maxLines: 3,
              decoration: InputDecoration(labelText: 'Descrição'),
            ),
            SizedBox(height: 12),
            Row(
              children: [
                Text('Data: ${DateFormat('dd/MM/yyyy').format(_dataEntrada)}'),
                Spacer(),
                TextButton(
                    onPressed: _selecionarData, child: Text('Alterar Data')),
              ],
            ),
            SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: _salvar,
              icon: Icon(Icons.save),
              label: Text('Salvar Produto'),
            )
          ],
        ),
      ),
    );
  }
}

class DetalhesProdutoPage extends StatelessWidget {
  final Produto produto;
  final void Function(Produto) onEditar;
  final VoidCallback onRemover;

  DetalhesProdutoPage({
    required this.produto,
    required this.onEditar,
    required this.onRemover,
  });

  void _editar(BuildContext context) async {
    final resultado = await Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => EditarProdutoPage(produto: produto)),
    );
    if (resultado is Produto) {
      onEditar(resultado);
      Navigator.pop(context);
    } else if (resultado == 'remover') {
      onRemover();
      Navigator.pop(context);
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Produto removido')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(produto.nome),
        actions: [
          IconButton(icon: Icon(Icons.edit), onPressed: () => _editar(context)),
        ],
      ),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text('Quantidade: ${produto.quantidade}',
              style: TextStyle(fontSize: 18)),
          SizedBox(height: 12),
          Text('Descrição:', style: TextStyle(fontWeight: FontWeight.bold)),
          Text(produto.descricao.isEmpty ? 'Nenhuma' : produto.descricao),
          SizedBox(height: 12),
          Text(
              'Data de Entrada: ${DateFormat('dd/MM/yyyy').format(produto.dataEntrada)}'),
        ]),
      ),
    );
  }
}

class EditarProdutoPage extends StatefulWidget {
  final Produto produto;

  EditarProdutoPage({required this.produto});

  @override
  _EditarProdutoPageState createState() => _EditarProdutoPageState();
}

class _EditarProdutoPageState extends State<EditarProdutoPage> {
  late TextEditingController _nomeController;
  late TextEditingController _quantidadeController;
  late TextEditingController _descricaoController;
  late DateTime _dataEntrada;

  @override
  void initState() {
    _nomeController = TextEditingController(text: widget.produto.nome);
    _quantidadeController =
        TextEditingController(text: widget.produto.quantidade.toString());
    _descricaoController =
        TextEditingController(text: widget.produto.descricao);
    _dataEntrada = widget.produto.dataEntrada;
    super.initState();
  }

  void _salvar() {
    final nome = _nomeController.text.trim();
    final qtd = int.tryParse(_quantidadeController.text);
    final desc = _descricaoController.text.trim();
    if (nome.isEmpty || qtd == null || qtd <= 0) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Verifique os campos')));
      return;
    }
    final editado = Produto(
      nome: nome,
      quantidade: qtd,
      descricao: desc,
      dataEntrada: _dataEntrada,
    );
    Navigator.pop(context, editado);
  }

  void _remover() {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: Text('Remover Produto?'),
        content: Text('Deseja remover "${widget.produto.nome}"?'),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(context), child: Text('Cancelar')),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pop(context, 'remover');
            },
            child: Text('Remover', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }

  void _alterarData() async {
    final data = await showDatePicker(
      context: context,
      initialDate: _dataEntrada,
      firstDate: DateTime(2000),
      lastDate: DateTime(2100),
    );
    if (data != null) setState(() => _dataEntrada = data);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Editar Produto'),
        actions: [IconButton(icon: Icon(Icons.delete), onPressed: _remover)],
      ),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: ListView(
          children: [
            TextField(
                controller: _nomeController,
                decoration: InputDecoration(labelText: 'Nome')),
            SizedBox(height: 12),
            TextField(
              controller: _quantidadeController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(labelText: 'Quantidade'),
            ),
            SizedBox(height: 12),
            TextField(
              controller: _descricaoController,
              maxLines: 3,
              decoration: InputDecoration(labelText: 'Descrição'),
            ),
            SizedBox(height: 12),
            Row(
              children: [
                Text('Data: ${DateFormat('dd/MM/yyyy').format(_dataEntrada)}'),
                Spacer(),
                TextButton(
                    onPressed: _alterarData, child: Text('Alterar Data')),
              ],
            ),
            SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: _salvar,
              icon: Icon(Icons.save),
              label: Text('Salvar Alterações'),
            ),
          ],
        ),
      ),
    );
  }
}
